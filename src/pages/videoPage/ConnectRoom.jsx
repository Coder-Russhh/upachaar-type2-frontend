import React, { useState, useCallback, useEffect } from "react";
import { useSocket } from "../../context/SocketProvider";
import peer from "../../services/peer";
import ReactPlayer from "react-player";

const ConnectRoom = () => {
  const socket = useSocket();
  const [remoteSocketId, setremoteSocketId] = useState(null);
  const [myStream, setmyStream] = useState(null);
  const [remoteStream, setremoteStream] = useState(null);

  const handleUserJoined = useCallback(({ email, id }) => {
    // console.log(`Email ${email} joined room`);
    setremoteSocketId(id);
  }, []);

  const handleIncomingCall = useCallback(
    async ({ from, offer }) => {
      setremoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setmyStream(stream);
      console.log(`Incoming Call`, from, offer);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    // all audio and videotracks--
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      sendStreams();
    },
    [sendStreams]
  );

  //   for handling negotation
  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);

  //   negiciation is used for reconnecting
  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  useEffect(() => {
    peer.peer.addEventListener("track", async (e) => {
      const remoteStream = e.streams;
      setremoteStream(remoteStream[0]);
    });
  }, []);

  useEffect(() => {
    // registration
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncomingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);
    //   deregister--
    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncomingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncomingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ]);

  //   call button click program--
  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setmyStream(stream);
  }, [remoteSocketId, socket]);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Room or Lobby</h1>
        <div className="text-xl mb-2">
          {remoteSocketId ? "Connected" : "No one in room"}
        </div>
        <div className="space-x-4">
          {myStream && (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={sendStreams}
            >
              Show Your Video
            </button>
          )}
          {remoteSocketId && (
            <button
              className="px-4 py-2 bg-color text-white rounded hover:bg-green-600"
              onClick={handleCallUser}
            >
              CALL
            </button>
          )}
        </div>
        <div className="flex flex-col md:flex-row gap-4 justify-center mt-4 space-x-4">
          {myStream && (
            <div>
              <h2 className="text-lg font-bold mb-2">My Stream</h2>
              <ReactPlayer
                playing
                muted
                height="150px"
                width="200px"
                url={myStream}
              />
            </div>
          )}
          {remoteStream && (
            <div>
              <h2 className="text-lg font-bold mb-2">Remote Stream</h2>
              <ReactPlayer
                playing
                muted
                height="150px"
                width="200px"
                url={remoteStream}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ConnectRoom;
