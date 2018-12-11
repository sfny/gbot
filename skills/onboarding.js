module.exports = function(controller) {

  // introduction
  // --> Ask Name
  //     acknowledge name
  //     --> Ask birthday
  //         acknowledge birthday and Save Birth date
  //         --> Ask Staffing
  //             Present functions

  beginOnboarding = function(response, convo) {
    convo.say("Hello!")
    convo.say("I'm Glean, the bot that helps your team communicate better :grinning:")
    convo.ask("Before we begin, what's your name?", function(response, convo) {
      convo.say(response.text + " Got it!");
      convo.next();
    });
  }

  controller.hears(['onboarding'],['direct_message'], function(bot,message){
    bot.startPrivateConversation(message,beginOnboarding)
  })

  controller.on('team_join', function(bot,response){
    let d = new Date()
        d.setHours(0,0,0,0)
    //Create a unique timestamp to know when the user joined the Slack Team for the first time
    response.user.joinedDate = d.valueOf()//new Date().toLocaleDateString("fr-FR") //to be tested
    controller.storage.users.save(response.user, function(err, _user){
      if (!err){
        console.log(_user.id + " has been added to the database")
      }
    })
    bot.startPrivateConversation({user:response.user.id}, beginOnboarding)
  })

  controller.on('onboard', function(bot){

        debug('Starting an onboarding experience!');

            bot.startPrivateConversation({user: bot.config.createdBy},function(err,convo) {
              if (err) {
                console.log(err);
              } else {
                convo.say('Welcome');
                convo.say('I am Glean, the bot to help you work better.');
              }
            });
        }
    )
}
