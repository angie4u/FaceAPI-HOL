window.onload = function () {
  $('#liPersonGroupId').hide()
  $('#liPersonId').hide()

  var subscriptionKey = document.getElementById('inputSubscriptionKey')
  var endpoint = document.getElementById('inputEndpoint')

  var personGroupName = document.getElementById('inputPersonGroup')
  // var personGroupDesc = document.getElementById('inputPersonGroupDesc')
  var personGroupJson = {name: 'personGroup', userData: 'user-provided data attached to the person group'}
  var personGroupDesc = JSON.stringify(personGroupJson, null, '\t')

  document.getElementById('inputPersonGroupDesc').defaultValue = personGroupDesc
  $('#personGroupResult').hide()

  var personName = document.getElementById('inputPerson')
  var personJson = {name: 'Person1', userData: 'User-provided data attached to the person'}
  // var personDesc = document.getElementById('inputPersonDesc')
  var personDesc = JSON.stringify(personJson, null, '\t')

  document.getElementById('inputPersonDesc').defaultValue = personDesc

  var sendPersonGroup = document.getElementById('personGroupSubmit')

  // api request
  function apiRequest (uri, body, method, flag) {
    $.ajax({
      url: uri,
          // Request headers.
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
        if (flag === 1) {
          $('#personGroupResult').show()
          document.getElementById('liPersonGroupId').innerHTML = personGroupName.value
          $('#liPersonGroupId').show()
        } else if (flag === 2) {
          var personId = data.personId
          console.log(personId)
          var jsonResult = JSON.stringify(data)

          $('#personResult').text(jsonResult)
          document.getElementById('liPersonId').innerHTML = personId
          $('#liPersonId').show()
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
