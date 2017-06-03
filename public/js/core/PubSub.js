//TODO add remove function
var PubSub = (function(){
    var subscribes =  [];
    return {
          subscribe  : function (subject, callBack)
            {
                var member = {
                    subject: subject,
                    callBack: callBack
                }
              subscribes.push(member);
            },
            publish : function (subject, data)
            {
               for(var index = 0; index < subscribes.length ; index++)
                {
                    if(subscribes[index]['subject'] === subject)
                       {
                        subscribes[index]['callBack'](data);
                        }
                }
            }
        }
}());

export default PubSub;
