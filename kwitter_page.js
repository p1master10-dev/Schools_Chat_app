// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCXyRVm2pycZMe2Vj9BxvQAZ4x2VZZm6-Q",
    authDomain: "kwitter-2-90f83.firebaseapp.com",
    databaseURL: "https://kwitter-2-90f83-default-rtdb.firebaseio.com",
    projectId: "kwitter-2-90f83",
    storageBucket: "kwitter-2-90f83.appspot.com",
    messagingSenderId: "664465782957",
    appId: "1:664465782957:web:72e22e3f38159764732e24"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

////
////
////

room_name = localStorage.getItem("room_name");

document.getElementById("room_name_show").innerText = room_name;

document.getElementById("titleSet").innerText = "Room - " + room_name;

function send(){
    user_name = localStorage.getItem("user_name");

    msg = document.getElementById("msg").value;

    firebase.database().ref(room_name).push({
        name: user_name,
        message: msg,
        likes: 0
    });

    document.getElementById("msg").value = "";
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("msg_part").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
    firebase_message_id = childKey;
    message_data = childData;
//Start code
  console.log(firebase_message_id);
  console.log(message_data);

  name2 = message_data['name'];
  message2 = message_data['message'];
  likes2 = message_data['likes'];

  user_name = localStorage.getItem("user_name");

  if(name2 == user_name){
    div_start = "<div class='message_sent'>";
    name_with_tag = "<h4 class='name'> You <span class='glyphicon glyphicon-user'></span></h4>";
    msg_with_tag = "<h4 class='message_h4'>" + message2 + "</h4>";
    like_button = "<button class='btn btn-warning my_button' id=" + firebase_message_id + " value=" + likes2 + " onclick='updateLikes(this.id)'>";
    span_with_tag = "<span class='glyphicon glyphicon-thumbs-up colorC'> Likes: " + likes2 + "</span>  </button><hr>";
    div_end = "</div>";

    row = div_start + name_with_tag + msg_with_tag + like_button + span_with_tag + div_end;

    document.getElementById("msg_part").innerHTML += row;
  }else{
    div_start2 = "<div class='message_sent'>";
    name_with_tag2 = "<h4 class='name'>" + name2 + "<span class='glyphicon glyphicon-user'></span></h4>";
    msg_with_tag2 = "<h4 class='message_h4'>" + message2 + "</h4>";
    like_button2 = "<button class='btn btn-warning my_button' id=" + firebase_message_id + " value=" + likes2 + " onclick='updateLikes(this.id)'>";
    span_with_tag2 = "<span class='glyphicon glyphicon-thumbs-up colorC'> Likes: " + likes2 + "</span>  </button><hr>";
    div_end2 = "</div>";

    row2 = div_start2 + name_with_tag2 + msg_with_tag2 + like_button2 + span_with_tag2 + div_end2;

    document.getElementById("msg_part").innerHTML += row2;
  }
//End code
 } });  }); }
getData();

function updateLikes(message_id){
    console.log("Click on the heart - " + message_id);

    button_id = message_id;
    
    like = document.getElementById(button_id).value;
    updated_likes = Number(like) + 1;
    console.log(updated_likes);

    firebase.database().ref(room_name).child(message_id).update({
        likes: updated_likes
    });
}