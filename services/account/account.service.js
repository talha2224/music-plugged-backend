const { accountModel } = require("../../models");
const bcrypt = require("bcryptjs")
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


const getUser = async (req, res) => {
    try {
        let userExits = await accountModel.findById(req.params.id)
        if (!userExits) {
            return res.status(404).json({ msg: "User Not Exits", data: null, code: 404 })
        }
        return res.status(200).json({ msg: null, data: userExits, code: 200 })

    }
    catch (error) {
        return error
    }
}

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


const storeSubscription = async (req,res)=>{
    let {userId,subId,subEndDate} = req.body
    let update = await accountModel.findByIdAndUpdate(userId,{subId,subEndDate},{$new:true})
    return res.status(200).json({ msg: "User Login", data: update, code: 200 })

}

module.exports = { registerUser, loginUser, getUser, createSubscription,storeSubscription }