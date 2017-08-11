var streamers = [
  "ESL_SC2",
  "freecodecamp",
  "b0aty",
  "RobotCaleb",
  "esamarathon",
  "noobs2ninjas",
  "thelordhelseth",
  "ogamingsc2"
];

function getStatus(userName) {
  $.ajax({
    url:
    "https://wind-bow.gomix.me/twitch-api/streams/" +
    userName +
    "?callback=?",
    jsonp: "callback",
    dataType: "jsonp",
    success: function (response) {
      var html = "";
      if (response.stream != null) {
        console.log(response);
        var streaming =
          response.stream.game + ": " + response.stream.channel.status;
        displayUserInfo(userName, "online", streaming);
      } else {
        displayUserInfo(userName, "offline");
      }
    }
  });
}

function displayUserInfo(userName, status, stream) {
  $.ajax({
    url:
    "https://wind-bow.gomix.me/twitch-api/channels/" +
    userName +
    "?callback=?",
    jsonp: "callback",
    dataType: "jsonp",
    success: function (response) {
      var online = "",
        offline = "";
      if (status == "online") {
        online +=
          "<li class='collection-item avatar' id='" +
          userName + "'><img src='" +
          response.logo + "' alt='' class='circle'><span class='title'>" +
          userName + "</span><p>LIVE <br><a href='" +
          response.url +
          "' target='_blank'>" +
          stream +
          "<i class='material-icons secondary-content waves-effect waves-light'>games</i></a></p></li>";
        $(".online").append(online);
      } else {
        offline +=
          "<li class='collection-item avatar' id='" +
          userName +
          "'><img src='" +
          response.logo +
          "' alt='' class='circle'> " +
          userName +
          "<p>OFFLINE</p></li>";
        $(".offline").append(offline);
      }
    }
  });
}

$(document).ready(function () {
  for (var i = 0; i < streamers.length; i++) {
    getStatus(streamers[i]);
  }
  var embed = new Twitch.Embed("twitch-embed", {
    width: 854,
    height: 480,
    channel: "b0aty",
    layout: "video",
    autoplay: false
  });

  var player = embed.getPlayer();
  player.addEventListener(Twitch.Player.PLAY, function () {
  });
  player.play();
});
$(".online").click(function () {
  alert(this.id)
});