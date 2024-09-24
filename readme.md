BACKEND API ROUTES


<!-- ACCOUNTS  -->
POST http://localhost:5000/api/v1/account/register ( FOR CREATING ACCOUNTS); body = {name,email,password}
POST http://localhost:5000/api/v1/account/login ( FOR LOGIN ACCOUNTS); body = {email,password}
GET http://localhost:5000/api/v1/account/single/:id ( FOR GETTING SINGLE ACCOUNT INFO ) :id is the account Id

<!-- CREATING ARTIST PTOFILE  -->
POST http://localhost:5000/api/v1/prefference/create ( CREATING ARTIST FOR PREFFERENCE PAGE); body = { name  and image}
GET http://localhost:5000/api/v1/prefference/all ( GETTING ALL ARTIST)

<!-- CREATING CATEGORY  -->
POST http://localhost:5000/api/v1/category/create ( CREATING CATEGORY); body = {title}
GET http://localhost:5000/api/v1/category/all ( GETTING ALL CATEGORY)

<!-- CREATING MUSIC  -->
POST http://localhost:5000/api/v1/music/create ( CREATING MUSIC); body = {title,description,artist:"artistProfileId",category:"categoeyId",listners,image,song,album:"albumId if songs belong to any album otherwise null"}
GET http://localhost:5000/api/v1/music/all ( GETTING ALL MUSIC)
GET http://localhost:5000/api/v1/music/single/:id ( GETTING SINGLE MUSIC BY ID)
GET http://localhost:5000/api/v1/music/category/:id  ( GETTING ALL MUSIC BY CATEGORY)
GET http://localhost:5000/api/v1/music/artist/:id ( GETTING ALL MUSIC BY ARTIST ID)


<!-- CREATING ALBUM MUSIC  -->
POST http://localhost:5000/api/v1/album/create ( CREATING ALBUM MUSIC); body = {title,artist:"artistProfileId",category:"categoeyId",image}
GET http://localhost:5000/api/v1/album/all ( GETTING ALL ALBUM MUSIC)
GET http://localhost:5000/api/v1/album/single/:id ( GETTING SINGLE ALBUM MUSIC BY ID)
GET http://localhost:5000/api/v1/album/category/:id  ( GETTING ALL ALBUM MUSIC BY CATEGORY)
GET http://localhost:5000/api/v1/album/artist/:id ( GETTING ALL ALBUM MUSIC BY ARTIST ID)
GET http://localhost:5000/api/v1/music/album/:id ( GETTING ALL MUSIC BY ALBUM ID)


<!-- SAVED MUSIC  -->
POST http://localhost:5000/api/v1/save/create (SAVING MUSIC ); body = {musicId,userId}
GET http://localhost:5000/api/v1/save/all/:id ( GETTING ALL SAVE MUSIC BY USERID)


<!-- USER PLAYLIST MUSIC  -->
POST http://localhost:5000/api/v1/playlist/create (SAVING COMPLETE PLAYLIST ); body = {musicId,userId,playlistId}
GET http://localhost:5000/api/v1/playlist/all/:id ( GETTING ALL SAVED PLAYLIST BY USERID)


<!-- USER SAVED MUSIC  -->
POST http://localhost:5000/api/v1/playlist/music/create (SAVING COMPLETE PLAYLIST ); body = {musicId,userId,playlistId}
GET http://localhost:5000/api/v1/playlist/music/all/:id ( GETTING ALL SAVED PLAYLIST BY USERID)


<!-- USER HISTORY   -->
POST http://localhost:5000/api/v1/history/create (SAVING HISTORY ); body = {musicId,userId}
GET http://localhost:5000/api/v1/history/all/:id ( GETTING ALL HISTORY BY USERID)



<!-- USER LIKE   -->
POST http://localhost:5000/api/v1/history/create (SAVING HISTORY ); body = {musicId,userId}
GET http://localhost:5000/api/v1/like/all/:id ( GETTING ALL HISTORY BY USERID)

<!-- FOLLOW ARTIST   -->
POST http://localhost:5000/api/v1/artist/follow (FOLLOW ARTIST); body = {artistId,userId}
PUT http://localhost:5000/api/v1/artist/unfollow/:id (UN FOLLOW ARTIST);
GET http://localhost:5000/api/v1/artist/follow/:userId/:artistId (GET FOLLOW ARTIST);


<!-- MOOD AND GENRES   -->
POST http://localhost:5000/api/v1/mood/create (Create MOOD); body = {title}
GET http://localhost:5000/api/v1/mood/all (GET ALL MOOD);
