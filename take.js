window.onload = function () {
    // document.getElementById('liSubscriptionKey').innerHTML = localStorage.getItem('key')
    // document.getElementById('liEnpoint').innerHTML = localStorage.getItem('url')
    // document.getElementById('liPersonGroupId').innerHTML = localStorage.getItem('personGroup')
    // document.getElementById('liPersonId').innerHTML = localStorage.getItem('person')
    
    
    document.getElementById('liSubscriptionKey').innerHTML = 'd53674714284400c885dd25bfd9f1617'
    document.getElementById('liEnpoint').innerHTML = 'https://westus.api.cognitive.microsoft.com/face/v1.0'
    document.getElementById('liPersonGroupId').innerHTML = 'eunkpg001'
    document.getElementById('liPersonId').innerHTML = 'c57ec2be-89ba-4fa7-9d9f-be5d61567e8f'
    


    var canvas = document.getElementById('canvas')
    var context = canvas.getContext('2d')
    var video = document.getElementById('video')
    var mediaConfig = { video: true }
    var errBack = function (e) {
        console.log('An error has occurred!', e)
    }

    // Put video listeners into place
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(mediaConfig).then(function (stream) {
        video.src = window.URL.createObjectURL(stream)
        video.play()
        })
    }

        /* Legacy code below! */
    else if (navigator.getUserMedia) { // Standard
        navigator.getUserMedia(mediaConfig, function (stream) {
        video.src = stream
        video.play()
        }, errBack)
    } else if (navigator.webkitGetUserMedia) { // WebKit-prefixed
        navigator.webkitGetUserMedia(mediaConfig, function (stream) {
        video.src = window.webkitURL.createObjectURL(stream)
        video.play()
        }, errBack)
    } else if (navigator.mozGetUserMedia) { // Mozilla-prefixed
        navigator.mozGetUserMedia(mediaConfig, function (stream) {
        video.src = window.URL.createObjectURL(stream)
        video.play()
        }, errBack)
    }

    function dataURLtoBlob (dataurl) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
        while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
        }
        return new Blob([u8arr], {type: mime})
    }

    document.getElementById('snap').addEventListener('click', function () {
        context.drawImage(video, 0, 0, 640, 480)
    })

    document.getElementById('send').addEventListener('click', function () {
            
        var uriBase = 'https://westus.api.cognitive.microsoft.com/face/v1.0/detect'
        var params = {
        'returnFaceId': 'true',
        'returnFaceLandmarks': 'false'
        }
        var uri = uriBase + '?' + $.param(params)

        var imgURL = canvas.toDataURL()
        var imageBinary = dataURLtoBlob(imgURL)
        var body = imageBinary

        var method = 'POST'
        $.ajax({
            url: uri,
                // Request headers.
            processData: false,
            beforeSend: function (xhrObj) {
              xhrObj.setRequestHeader('Content-Type', 'application/octet-stream')
              xhrObj.setRequestHeader('Ocp-Apim-Subscription-Key', 'd53674714284400c885dd25bfd9f1617')
            },
            type: method,
            data: body
          })
        .done(function (data) {
        
            console.log(data)
            var returnFaceId = JSON.stringify(data[0].faceId)
            console.log(returnFaceId)
            localStorage.setItem('faceId',returnFaceId)
            document.getElementById('liFaceId').innerHTML = localStorage.getItem('faceId')
            $('#takePhotoResult').val(JSON.stringify(data, null, 2))
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            // Display error message.
            var errorString = (errorThrown === '') ? 'Error. ' : errorThrown + ' (' + jqXHR.status + '): '
            errorString += (jqXHR.responseText === '') ? '' : (jQuery.parseJSON(jqXHR.responseText).message)
                ? jQuery.parseJSON(jqXHR.responseText).message : jQuery.parseJSON(jqXHR.responseText).error.message
            alert(errorString)
        })
            
    })
    
    
}
  