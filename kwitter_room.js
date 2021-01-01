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




user_name = localStorage.getItem("user_name");

  function createRoom(){
        room_name = document.getElementById("room_name").value;
  
        teacher_check = document.getElementById("teacher_check");

        localStorage.setItem("room_name" , room_name);

        
  
        if(teacher_check.checked == true){
          firebase.database().ref("/").child(room_name).update({
              purpose: "Adding Room Of Teacher"
          });
        }else{
          firebase.database().ref("/").child(room_name).update({
              purpose: "Adding Room Of Student"
          });
    }

    window.location = "kwitter_page.html";
  }

  function logOut(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");

      confirm_log = confirm(user_name + " , are you sure ? you will logout");

      if(confirm_log == true){
          window.location = "index.html";
          alert(" Loging Out . . . Done . . . !");
      }else{
          window.location = "kwitter_room.html";
          alert("Okay");
      }
  }

  function getData() {firebase.database().ref("/").on('value',function(snapshot) {document.getElementById("join_room_names").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey =childSnapshot.key;
    Room_names = childKey;
      //Start code
      teacher_check2 = document.getElementById("teacher_check");

      if(teacher_check2.checked == true){
        console.log("Room Name - " + Room_names);
        
        //Marking its as teachers room//

        row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' style='text-align: center; font-weight: 800; font-family: 'Russo One', sans-serif; color: black;'>#" + room_name + " <br><br><span style='color: red; font-size: 15px; font-weight: 800; ' class='glyphicon glyphicon-blackboard'>   Marked as Teachers Room</span></div><hr>";
  
        document.getElementById("join_room_names").innerHTML += row;

        console.log("teachers");
      }else{
          console.log("Room Name - " + Room_names);

          //Marking its as students room//

          row2 = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' style='text-align: center; font-weight: 800; font-family: 'Russo One', sans-serif; color: black;'>#" + room_name + " <br><br><span class='glyphicon glyphicon-education' style='color: green; font-size: 15px; font-weight: 800; '>   Marked as Students Room</span></div><hr>";
  
          document.getElementById("join_room_names").innerHTML += row2;

          console.log("students");
      }
      //End code
});
});
}
getData();

function redirectToRoomName(name){
    console.log(name);

    localStorage.setItem("room_name" , name);

    window.location = "kwitter_page.html";
}