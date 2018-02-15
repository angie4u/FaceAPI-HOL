window.onload = function () {
  $('#liPersonGroupName').hide()
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
  sendPersonGroup.addEventListener('click', function () {
    // personGroup 생성 요청

    // cognitive 서비스 호출
    var uriBase = endpoint.value + '/persongroups'
    var bodyDetail = document.getElementById('inputPersonGroupDesc')

    $.ajax({
      url: uriBase + '/' + personGroupName.value,
          // Request headers.
      beforeSend: function (xhrObj) {
        xhrObj.setRequestHeader('Content-Type', 'application/json')
        xhrObj.setRequestHeader('Ocp-Apim-Subscription-Key', subscriptionKey.value)
      },
      type: 'PUT',
      data: bodyDetail.value
    })
      .done(function (data) {
        // $('#personGroupResult').text('성공적으로 생성되었습니다!')
        // $('#personGroupResult').text(data)
        console.log(data)
        $('#personGroupResult').show()
        $('#liPersonGroupName').value(personGroupName.value)
        $('#liPersonGroupName').show()
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
          // Display error message.
        var errorString = (errorThrown === '') ? 'Error. ' : errorThrown + ' (' + jqXHR.status + '): '
        errorString += (jqXHR.responseText === '') ? '' : (jQuery.parseJSON(jqXHR.responseText).message)
              ? jQuery.parseJSON(jqXHR.responseText).message : jQuery.parseJSON(jqXHR.responseText).error.message
        alert(errorString)
      })
  })

  var sendPerson = document.getElementById('personSubmit')
  sendPerson.addEventListener('click', function () {
    // person 생성 요청

    // cognitive 서비스 호출
    var uriBase = endpoint.value + '/persongroups'
    var bodyDetail = document.getElementById('inputPersonDesc')

    $.ajax({
      url: uriBase + '/' + personName.value + '/persons',
          // Request headers.
      beforeSend: function (xhrObj) {
        xhrObj.setRequestHeader('Content-Type', 'application/json')
        xhrObj.setRequestHeader('Ocp-Apim-Subscription-Key', subscriptionKey.value)
      },
      type: 'POST',
      data: bodyDetail.value
    })
      .done(function (data) {
        // $('#personGroupResult').text('성공적으로 생성되었습니다!')
        // $('#personGroupResult').text(data)
        console.log(data)
        var jsonObject = JSON.parse(data)
        var personId = jsonObject.personId
        console.log(personId)
        var jsonResult = JSON.stringify(data)

        // $('#personGroupResult').show()
        $('#personResult').text(jsonResult)
        $('#liPersonId').value(personId)
        $('#liPersonId').show()
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
          // Display error message.
        var errorString = (errorThrown === '') ? 'Error. ' : errorThrown + ' (' + jqXHR.status + '): '
        errorString += (jqXHR.responseText === '') ? '' : (jQuery.parseJSON(jqXHR.responseText).message)
              ? jQuery.parseJSON(jqXHR.responseText).message : jQuery.parseJSON(jqXHR.responseText).error.message
        alert(errorString)
        console.log(errorString)
      })
  })
}
