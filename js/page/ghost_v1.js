function ghostRoomLoad(readyCallBack) {
	ghostroom.control.RoomController.create(function(){
		readyCallBack();
	});
}
function ghostRoomStart(callback) {
	ghostroom.control.RoomController.start(function(){
		callback();
	});
}
function ghostRoomStop() {
	ghostroom.control.RoomController.remove();
}

