/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        document.write(`device ready<br>`)
        // document.write(`<textarea style="width:100%" rows="10">${JSON.stringify(window.FirebasePlugin)}</textarea>`)
        // 
        // document.write(`<hr>FirebasePlugin getToken<br>`)
        // window.FirebasePlugin.getToken(function(token) {
        //   // save this server-side and use it to push notifications to this device
        //   document.write(`token : ${token}<br>`)
        //   console.log(token);
        // }, function(error) {
        //   document.write(`error : ${JSON.stringify(error)}<br>`)
        //   console.error(error);
        // });
        // document.write(`<hr>`)
        // 
        // // INIT PUSH NOTIFICATIONS
        console.log('calling push init');
        try {
          document.write(typeof PushNotification+'<br>')
          let push = PushNotification.init({
            'android': {
              // 'senderID': 'XXXXXXXX'
            },
            'browser': {},
            'ios': {
              'sound': true,
              'vibration': true,
              'badge': true,
              'alert': true
              // 'senderID': 'xxxxxxxx'
            },
            'windows': {}
          })
          console.log('after init')
          push.on('registration', function(data) {
            console.log('registration event: ' + data.registrationId)
            document.write('registration event: ' + data.registrationId + '<br>')
            var oldRegId = window.localStorage.getItem('registrationId')
            if (oldRegId !== data.registrationId) {
              window.localStorage.setItem('registrationId', data.registrationId)
              // Post registrationId to your app server as the value has changed
              // TODO
            }
          })
          push.on('error', function(e) {
            console.log('push error = ' + e.message)
            document.write('push error = ' + e.message + '<br>')
          })
          push.on('notification', function(data) {
            console.log('notification event')
            document.write('notification event' + '<br>')
            console.log(JSON.stringify(data))
            document.write(JSON.stringify(data) + '<br>')
            navigator.notification.alert(
              data.message,         // message
              function() {},
              data.title,
              'En savoir plus'
            )
          })
          
        } catch (e) {
          document.write(e)
        }
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
      var parentElement = document.getElementById(id);
      var listeningElement = parentElement.querySelector('.listening');
      var receivedElement = parentElement.querySelector('.received');

      listeningElement.setAttribute('style', 'display:none;');
      receivedElement.setAttribute('style', 'display:block;');

      console.log('Received Event: ' + id);
      
      // // INIT PUSH NOTIFICATIONS
      // console.log('calling push init');
      // let push = PushNotification.init({
      //   'android': {
      //     // 'senderID': 'XXXXXXXX'
      //   },
      //   'browser': {},
      //   'ios': {
      //     'sound': true,
      //     'vibration': true,
      //     'badge': true,
      //     'alert': true
      //     // 'senderID': 'xxxxxxxx'
      //   },
      //   'windows': {}
      // })
      // console.log('after init')
      // push.on('registration', function(data) {
      //   console.log('registration event: ' + data.registrationId)
      //   var oldRegId = window.localStorage.getItem('registrationId')
      //   if (oldRegId !== data.registrationId) {
      //     window.localStorage.setItem('registrationId', data.registrationId)
      //     // Post registrationId to your app server as the value has changed
      //     // TODO
      //   }
      // })
      // push.on('error', function(e) {
      //     console.log('push error = ' + e.message)
      // })
      // push.on('notification', function(data) {
      //   console.log('notification event')
      //   console.log(JSON.stringify(data))
      //   navigator.notification.alert(
      //     data.message,         // message
      //     function() {},
      //     data.title,
      //     'En savoir plus'
      //   )
      // })
    }
};
