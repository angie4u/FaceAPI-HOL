
var stepNumber = 1
// Put event listeners into place
var pgDetail = {name: 'personGroup', userData: 'user-provided data attached to the person group'}
var pgJsonString = JSON.stringify(pgDetail, null, '\t')
var faceId1 = ''
var faceId2 = ''
var faceId3 = ''
var faceId4 = ''
var personGroupId = ''

window.addEventListener('DOMContentLoaded', function () {
    // SubscriptionKey, Endpoint, PersonGroup, Person 값 정하는 곳

  var subscriptionKey = document.getElementById('inputSubscriptionKey').value
  var endpoint = document.getElementById('inputEndpoint').value

  var personGroupName = document.getElementById('inputPersonGroup').value
  var personGroupDesc = document.getElementById('inputPersonGroupDesc').value

  // person group 생성 요청
  document.getElementById('personGroupSubmit').addEventListener('click', function () {
    // person group 생성 버튼 클릭시 jquery 호출 코드

    // cognitive 서비스 호출
    var uriBase = endpoint + '/persongroups'

    $.ajax({
      url: uriBase + '/' + personGroupName,
        // Request headers.
      beforeSend: function (xhrObj) {
        xhrObj.setRequestHeader('Content-Type', 'application/json')
        xhrObj.setRequestHeader('Ocp-Apim-Subscription-Key', subscriptionKey)
      },
      type: 'PUT',
      data: personGroupDesc
    })
    .done(function (data) {
      $('#personGroupResult').text('성공적으로 생성되었습니다!')
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        // Display error message.
      var errorString = (errorThrown === '') ? 'Error. ' : errorThrown + ' (' + jqXHR.status + '): '
      errorString += (jqXHR.responseText === '') ? '' : (jQuery.parseJSON(jqXHR.responseText).message)
            ? jQuery.parseJSON(jqXHR.responseText).message : jQuery.parseJSON(jqXHR.responseText).error.message
      alert(errorString)
    })
  })

  $('#personGroupDetail').val(pgJsonString)
  $('#createPersonGroup').hide()
  $('#cameraCapture').hide()
  $('#identifyResult').hide()
    // Grab elements, create settings, etc.
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

    // Trigger photo take
  document.getElementById('snap').addEventListener('click', function () {
    context.drawImage(video, 0, 0, 640, 480)
  })

  function dataURLtoBlob (dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], {type: mime})
  }

    // Trigger photo take
  document.getElementById('send').addEventListener('click', function () {
    var imgURL = canvas.toDataURL()
    var imageBinary = dataURLtoBlob(imgURL)

        // cognitive 서비스 호출
    var subscriptionKey = 'd53674714284400c885dd25bfd9f1617'
    var uriBase = 'https://westus.api.cognitive.microsoft.com/face/v1.0/detect'
    var params = {
      'returnFaceId': 'true',
      'returnFaceLandmarks': 'false'
    }

        // Perform the REST API call.
    $.ajax({
      url: uriBase + '?' + $.param(params),
      processData: false,
            // Request headers.
      beforeSend: function (xhrObj) {
        xhrObj.setRequestHeader('Content-Type', 'application/octet-stream')
        xhrObj.setRequestHeader('Ocp-Apim-Subscription-Key', subscriptionKey)
      },

      type: 'POST',

            // Request body.
      data: imageBinary
    })

        .done(function (data) {
            // Show formatted JSON on webpage.
          var returnFaceId = JSON.stringify(data[0].faceId)
          console.log(returnFaceId)
          if (stepNumber == 1) {
            faceId1 = returnFaceId
          } else if (stepNumber == 3) {
            faceId2 = returnFaceId
          } else if (stepNumber == 4) {
            faceId3 = returnFaceId
          } else if (stepNumber == 5) {
            faceId5 = returnFaceId
          }

          $('#responseTextArea').val(JSON.stringify(data, null, 2))
            // $("#myfaceId").val(faceId);

          $('#idcardCapture').hide()
          $('#createPersonGroup').show()

          stepNumber++
        })

        .fail(function (jqXHR, textStatus, errorThrown) {
            // Display error message.
          var errorString = (errorThrown === '') ? 'Error. ' : errorThrown + ' (' + jqXHR.status + '): '
          errorString += (jqXHR.responseText === '') ? '' : (jQuery.parseJSON(jqXHR.responseText).message)
                ? jQuery.parseJSON(jqXHR.responseText).message : jQuery.parseJSON(jqXHR.responseText).error.message
          alert(errorString)
        })
  })
}, false)
