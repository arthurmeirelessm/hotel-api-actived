//Methods
//Index: Sessions list (GET)
//Store: Create new session(POST)
//Show: When we want to only one session of list(GET)
//Update: When we want to change one session(PUT)
//Destroy: When we want to delete one session(DELETE)


class SessionController {

    store(req, res){
      return res.json( { message: 'My API' } )
    }
}



export default new SessionController()