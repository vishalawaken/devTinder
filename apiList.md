# DevTinder API'S

<!-- Auth Router -->
- POST /signup
- POST/login
- POST/logout

<!-- Profile Router -->
- GET/profile/view
- PATCH/profile/edit
- PATCH /profile/password


<!-- Connection Request Router -->
- POST/request/send/status/:userId    - can be either ignored or interested
- 
- POST/request/review/accepted/:requestId
- POST/request/review/rejected/:requestId

<!-- User Router -->
- GET/user/connections
- GET/user/requests/received
- GET/user/feed - Gets you the profile of other users

STATUS:ignored,interested,accepted,rejected


