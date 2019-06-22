let handleFail = function(err){
    console.log("Error : ", err);
};
let remoteContainer= document.getElementById("remote-container");
let client = AgoraRTC.createClient({
    mode: 'live',
    codec: "h264"
});
client.init("019304ec2f234cb6b3d4f3871c8517dc",() => console.log("AgoraRTC client initialized") ,handleFail);
client.join(<token key>,"channel1",null, (uid)=>{
    let localStream = AgoraRTC.createStream({
        streamID: uid,
        audio: true,
        video: true,
        screen: false
    });
    localStream.init(function() {
        localStream.play('me');
        client.publish(localStream, handleFail);
        client.on('stream-published'handleFail);
    },handleFail);
},handleFail);
client.on('stream-added', function (evt) {
    client.subscribe(evt.stream, handleFail);
});
client.on('stream-subscribed', function (evt) {
    let rstream = evt.stream;
    addVideoStream(rstream.getId());
    rstream.play('you'+rstream.getId());
});

client.leave(function(){
console.log("Leave channel successfully");
},handleFail);
/*
client.on('stream-removed',removeVideoStream);
client.on('peer-leave',removeVideoStream);
*/
