let handleFail = function(err){
    console.log("Error : ", err);
};
let remoteContainer= document.getElementById("rc");
let client = AgoraRTC.createClient({
    mode: 'live',
    codec: "h264"
});
client.init("6e84c9035a1147429a7e2ec1fdf3ca82",() => console.log("AgoraRTC client initialized") ,handleFail);
client.join(0066e84c9035a1147429a7e2ec1fdf3ca82IAAyMElPO/1G0JbOA2Rw2Mh3BuzCB+QzfFIXlIbfVu65GJ8YTssAAAAAEAAapIRrr7gPXQEAAQCXuA9d,"agorahack",null, (uid)=>{
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
