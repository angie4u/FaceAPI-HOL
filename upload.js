window.onload = function () {
    document.getElementById('liSubscriptionKey').innerHTML = localStorage.getItem('key')
    document.getElementById('liEnpoint').innerHTML = localStorage.getItem('url')
    document.getElementById('liPersonGroupId').innerHTML = localStorage.getItem('personGroup')
    document.getElementById('liPersonId').innerHTML = localStorage.getItem('person')
  
    // document.getElementById('liSubscriptionKey').innerHTML = 'd53674714284400c885dd25bfd9f1617'
    // document.getElementById('liEnpoint').innerHTML = 'https://westus.api.cognitive.microsoft.com/face/v1.0'
    // document.getElementById('liPersonGroupId').innerHTML = 'eunkpg001'
    // document.getElementById('liPersonId').innerHTML = 'c57ec2be-89ba-4fa7-9d9f-be5d61567e8f'
    

    document.getElementById('photoSubmit').addEventListener('click', function () {
          // alert('Hello! I am an alert box!!')
      var uploadImage = document.getElementById("uploadImage").files[0]
      var personGroupId = 'eunkpg001'
      var personId = 'c57ec2be-89ba-4fa7-9d9f-be5d61567e8f'

      var uriBase = 'https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups/' + personGroupId + '/persons/' + personId + '/persistedFaces'
      
      $.ajax({
        url: uriBase,
            // Request headers.
        processData: false,
        beforeSend: function (xhrObj) {
          xhrObj.setRequestHeader('Content-Type', 'application/octet-stream')
          xhrObj.setRequestHeader('Ocp-Apim-Subscription-Key', 'd53674714284400c885dd25bfd9f1617')
        },
        type: 'POST',
        data: uploadImage
      })
    .done(function (data) {
        console.log(data.persistedFaceId)
        var jsonResult = JSON.stringify(data)
        $('#photoResult').text(jsonResult)        
    })
    })
  }
  