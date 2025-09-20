const { accountModel, shortMusicModel } = require("../../models");
const bcrypt = require("bcryptjs");
const { uploadFile } = require("../../utils/function");
const stripe = require("stripe")("sk_test_51OjJpTASyMRcymO6FVBewDoB2x4Wi5tq5uX5PYSfkAC2pU0sZvWJbZIqGoMTnzEYYFjFh4jbcWYD3OyFc761otRt00tX4j1UO2");








const registerUser = async (req, res) => {
    try {
        let { name, email, password } = req.body
        console.log(name, email, password, 'name,email,password')
        let userExits = await accountModel.findOne({ email: email })
        if (userExits) {
            return res.status(403).json({ msg: "User Exits", data: null, code: 403 })
        }
        let hash = await bcrypt.hash(password, 10)
        let create = await accountModel.create({ name, email, password: hash })
        console.log(create, 'create')
        return res.status(200).json({ msg: "User Created", data: create, code: 200 })
    }
    catch (error) {
        return error
    }
}

const loginUser = async (req, res) => {
    try {
        let { email, password } = req.body
        let userExits = await accountModel.findOne({ email: email })
        if (!userExits) {
            return res.status(404).json({ msg: "User Not Exits", data: null, code: 404 })
        }
        let compare = await bcrypt.compare(password, userExits.password)
        if (compare) {
            return res.status(200).json({ msg: "User Login", data: userExits, code: 200 })
        }
        return res.status(403).json({ msg: "Invalid Credentials", data: null, code: 403 })
    }
    catch (error) {
        return error
    }
}


const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        let user = await accountModel.findById(id);
        if (!user) {
            return res.status(404).json({ msg: "User Not Found", data: null, code: 404 });
        }

        let { name, bio } = req.body;
        let updateData = {};

        if (name) updateData.name = name;
        if (bio) updateData.bio = bio;

        if (req.file) {
            let imageUrl = await uploadFile(req.file);
            updateData.profile_image = imageUrl;
        }

        let updatedUser = await accountModel.findByIdAndUpdate(id, updateData, { new: true });

        return res.status(200).json({ msg: "Profile Updated", data: updatedUser, code: 200 });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error.message, code: 500 });
    }
};

const createSubscription = async (req, res) => {
    try {
        let userExits = await accountModel.findById(req.body.id)
        // let updateSub = await accountModel.findByIdAndUpdate(req.body.id,{subId:"",subEndDate:""})
        const existingCustomers = await stripe.customers.list({ email: userExits.email, limit: 1, });
        if (existingCustomers.data.length > 0) {
            customer = existingCustomers.data[0];
            const subscriptions = await stripe.subscriptions.list({ customer: customer.id, status: "active", limit: 1, });
            if (subscriptions.data.length > 0) {
                return res.status(409).json({ msg: "You already have a active subscrption" });
            }
        }
        else {
            customer = await stripe.customers.create({ email: userExits.email, metadata: { userId: req.body.id }, });
        }

        const session = await stripe.checkout.sessions.create({
            success_url: "https://music-plugged.netlify.app/",
            cancel_url: "https://music-plugged.netlify.app/",
            payment_method_types: ["card"],
            mode: "subscription",
            billing_address_collection: "auto",
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "Music Subscription",
                            description: "Unlimited Music",
                        },
                        unit_amount: 8000,
                        recurring: {
                            interval: "month",
                        },
                    },
                    quantity: 1,
                },
            ],
            metadata: { userId: req.body.id, },
            customer: customer.id,
        });

        res.json({ id: session.id });
    }
    catch (error) {
        console.log(error)
        return error
    }
}

const storeSubscription = async (req, res) => {
    let { userId, subId, subEndDate } = req.body
    let update = await accountModel.findByIdAndUpdate(userId, { subId, subEndDate }, { $new: true })
    return res.status(200).json({ msg: "User Login", data: update, code: 200 })

}

const followUser = async (req, res) => {
    try {
        const { userId, targetId } = req.body;

        if (userId === targetId) {
            return res.status(400).json({ msg: "You cannot follow yourself", code: 400 });
        }

        const user = await accountModel.findById(userId);
        const target = await accountModel.findById(targetId);

        if (!user || !target) {
            return res.status(404).json({ msg: "User not found", code: 404 });
        }

        if (user.following.includes(targetId)) {
            return res.status(400).json({ msg: "Already following this user", code: 400 });
        }

        user.following.push(targetId);
        target.followers.push(userId);

        await user.save();
        await target.save();

        return res.status(200).json({ msg: "Followed successfully", code: 200 });
    } catch (error) {
        return res.status(500).json({ msg: error.message, code: 500 });
    }
};

const unfollowUser = async (req, res) => {
    try {
        const { userId, targetId } = req.body;

        const user = await accountModel.findById(userId);
        const target = await accountModel.findById(targetId);

        if (!user || !target) {
            return res.status(404).json({ msg: "User not found", code: 404 });
        }

        if (!user.following.includes(targetId)) {
            return res.status(400).json({ msg: "You are not following this user", code: 400 });
        }

        user.following = user.following.filter(id => id.toString() !== targetId);
        target.followers = target.followers.filter(id => id.toString() !== userId);

        await user.save();
        await target.save();

        return res.status(200).json({ msg: "Unfollowed successfully", code: 200 });
    } catch (error) {
        return res.status(500).json({ msg: error.message, code: 500 });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await accountModel.findById(req.params.id)
            .populate("followers", "name profile_image")
            .populate("following", "name profile_image");

        if (!user) {
            return res.status(404).json({ msg: "User Not Exists", data: null, code: 404 });
        }

        // fetch all shorts by this user
        const shorts = await shortMusicModel.find({ user_id: req.params.id });

        const userData = {
            ...user.toObject(),
            followersCount: user.followers.length,
            followingCount: user.following.length,
            shorts: shorts, // attach shorts here
        };

        return res.status(200).json({ msg: null, data: userData, code: 200 });
    } catch (error) {
        return res.status(500).json({ msg: error.message, code: 500 });
    }
};


module.exports = { registerUser, loginUser, getUser, createSubscription, storeSubscription, updateUser, followUser, unfollowUser }