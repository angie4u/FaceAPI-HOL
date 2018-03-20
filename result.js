
window.onload = function () {
    // document.getElementById('liSubscriptionKey').innerHTML = localStorage.getItem('key')
    // document.getElementById('liEnpoint').innerHTML = localStorage.getItem('url')
    // document.getElementById('liPersonGroupId').innerHTML = localStorage.getItem('personGroup')
    // document.getElementById('liPersonId').innerHTML = localStorage.getItem('person')
    // document.getElementById('liFaceId').innerHTML = localStorage.getItem('faceId')
    // document.getElementById('liSubscriptionKey').innerHTML = 'd53674714284400c885dd25bfd9f1617'
    // document.getElementById('liEnpoint').innerHTML = 'https://westus.api.cognitive.microsoft.com/face/v1.0'
    // document.getElementById('liPersonGroupId').innerHTML = 'eunkpg001'
    // document.getElementById('liPersonId').innerHTML = 'c57ec2be-89ba-4fa7-9d9f-be5d61567e8f'
    // document.getElementById('liFaceId').innerHTML = '5ae1b6bc-7f75-48fb-a382-fadf4a387468'
    // document.getElementById("verificationResult").style.visibility = "hidden";

    
    const subscriptionKey = 'd53674714284400c885dd25bfd9f1617'
      const person_Id = 'c57ec2be-89ba-4fa7-9d9f-be5d61567e8f'
      const face_Id = '5ae1b6bc-7f75-48fb-a382-fadf4a387468'
      const group_Id = 'eunkpg001'
      var jsonBody = {faceId: face_Id, personId: person_Id, personGroupId: group_Id}
      var jsonToString = JSON.stringify(jsonBody, null, '\t')
      

      var uriBase = 'https://westus.api.cognitive.microsoft.com/face/v1.0/verify' 

      $.ajax({
        url: uriBase,
            // Request headers.
        
        beforeSend: function (xhrObj) {
          xhrObj.setRequestHeader('Content-Type', 'application/json')
          xhrObj.setRequestHeader('Ocp-Apim-Subscription-Key', subscriptionKey)
        },
        type: 'POST',
        data: jsonToString
      })
    .done(function (data) {
        console.log(data.persistedFaceId)
        var jsonResult = JSON.stringify(data)
        $('#verificationResult').text(jsonResult)        
    })
  }
  