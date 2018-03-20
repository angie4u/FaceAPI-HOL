window.onload = function () {
  // $('#liPersonGroupId').hide()
  // $('#liPersonId').hide()

  // var pageName = location.href.split('/').slice(-1).toString()
  // console.log(pageName)

  var subscriptionKey = document.getElementById('inputSubscriptionKey')
  var endpoint = document.getElementById('inputEndpoint')

  var personGroupName = document.getElementById('inputPersonGroup')
  // var personGroupDesc = document.getElementById('inputPersonGroupDesc')
  var personGroupJson = {name: 'personGroup', userData: 'user-provided data attached to the person group'}
  var personGroupDesc = JSON.stringify(personGroupJson, null, '\t')

  document.getElementById('inputEndpoint').addEventListener('change', () => {
    localStorage.setItem('url', endpoint.value)
    document.getElementById('liEnpoint').innerHTML = localStorage.getItem('url')
  })

  document.getElementById('inputSubscriptionKey').addEventListener('change', () => {
    localStorage.setItem('key', subscriptionKey.value)
    document.getElementById('liSubscriptionKey').innerHTML = localStorage.getItem('key')
  })

  document.getElementById('inputPersonGroupDesc').defaultValue = personGroupDesc
  $('#personGroupResult').hide()

  var personName = document.getElementById('inputPerson')
  var personJson = {name: 'Person1', userData: 'User-provided data attached to the person'}
  // var personDesc = document.getElementById('inputPersonDesc')
  var personDesc = JSON.stringify(personJson, null, '\t')

  document.getElementById('inputPersonDesc').defaultValue = personDesc
  var sendPersonGroup = document.getElementById('personGroupSubmit')

  // var canvas = document.getElementById('canvas')
  // var context = canvas.getContext('2d')
  // var video = document.getElementById('video')
  // var mediaConfig = { video: true }
  // var errBack = function (e) {
  //   console.log('An error has occurred!', e)
  // }

  // if (pageName === 'page1.html') {
  //   // Put video listeners into place
  //   if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  //     navigator.mediaDevices.getUserMedia(mediaConfig).then(function (stream) {
  //       video.src = window.URL.createObjectURL(stream)
  //       video.play()
  //     })
  //   }

  //   /* Legacy code below! */
  //   else if (navigator.getUserMedia) { // Standard
  //     navigator.getUserMedia(mediaConfig, function (stream) {
  //       video.src = stream
  //       video.play()
  //     }, errBack)
  //   } else if (navigator.webkitGetUserMedia) { // WebKit-prefixed
  //     navigator.webkitGetUserMedia(mediaConfig, function (stream) {
  //       video.src = window.webkitURL.createObjectURL(stream)
  //       video.play()
  //     }, errBack)
  //   } else if (navigator.mozGetUserMedia) { // Mozilla-prefixed
  //     navigator.mozGetUserMedia(mediaConfig, function (stream) {
  //       video.src = window.URL.createObjectURL(stream)
  //       video.play()
  //     }, errBack)
  //   }
  // }

  // api request
  function apiRequest (uri, body, method, flag) {
    $.ajax({
      url: uri,
          // Request headers.
      processData: false,
      beforeSend: function (xhrObj) {
        xhrObj.setRequestHeader('Content-Type', 'application/json')
        xhrObj.setRequestHeader('Ocp-Apim-Subscription-Key', subscriptionKey.value)
      },
      type: method,
      data: body
    })
      .done(function (data) {
        // $('#personGroupResult').text('성공적으로 생성되었습니다!')
        // $('#personGroupResult').text(data)
        console.log(data)
        console.log(flag)
        // local Storage에 필요한 변수들 저장

        if (flag === 1) {
          // personGroup 생성하는 경우
          $('#personGroupResult').show()
          document.getElementById('liPersonGroupId').innerHTML = personGroupName.value
          $('#liPersonGroupId').show()

          localStorage.setItem('personGroup', personGroupName.value)
          document.getElementById('liPersonGroupId').innerHTML = localStorage.getItem('personGroup')
        } else if (flag === 2) {
          var personId = data.personId
          console.log(personId)
          var jsonResult = JSON.stringify(data)

          $('#personResult').text(jsonResult)
          document.getElementById('liPersonId').innerHTML = personId
          $('#liPersonId').show()

          localStorage.setItem('person', personId)
          document.getElementById('liPersonId').innerHTML = localStorage.getItem('person')
        } else if (flag === 3) {
          var returnFaceId = JSON.stringify(data[0].faceId)
          console.log(returnFaceId)
          $('#responseTextArea').val(JSON.stringify(data, null, 2))
        }
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
          // Display error message.
        var errorString = (errorThrown === '') ? 'Error. ' : errorThrown + ' (' + jqXHR.status + '): '
        errorString += (jqXHR.responseText === '') ? '' : (jQuery.parseJSON(jqXHR.responseText).message)
              ? jQuery.parseJSON(jqXHR.responseText).message : jQuery.parseJSON(jqXHR.responseText).error.message
        alert(errorString)
      })
  }

  sendPersonGroup.addEventListener('click', function () {
    // personGroup 생성 요청

    // cognitive 서비스 호출
    var uriBase = endpoint.value + '/persongroups'
    var bodyDetail = document.getElementById('inputPersonGroupDesc')
    var uri = uriBase + '/' + personGroupName.value
    var method = 'PUT'
    var body = bodyDetail.value
    var flag = 1

    // localStorage.setItem('url', endpoint.value)
    // document.getElementById('liEnpoint').innerHTML = localStorage.getItem('url')

    apiRequest(uri, body, method, flag)
  })

  var sendPerson = document.getElementById('personSubmit')
  sendPerson.addEventListener('click', function () {
    // person 생성 요청

    // cognitive 서비스 호출
    var uriBase = endpoint.value + '/persongroups'
    var bodyDetail = document.getElementById('inputPersonDesc')

    var uri = uriBase + '/' + personName.value + '/persons'
    var body = bodyDetail.value
    var method = 'POST'
    var flag = 2

    apiRequest(uri, body, method, flag)
  })
}
