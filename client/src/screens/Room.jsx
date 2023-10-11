import React, { useCallback, useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider";
import ReactPlayer from 'react-player'
const Room = () => {
  const socket = useSocket();
const [remoteSocketId,setRemoteSocketId] = useState(null);
const [myStream,setMyStream]= useState();

  const HandleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email: ${email} Joined Room with ${id}`);
    setRemoteSocketId(id);
  }, []);
  const handleCallUser = useCallback(async()=>{
    const stream = await navigator.mediaDevices.getUserMedia({
audio:true,
video:true
    });
    setMyStream(stream);
  },[])
  useEffect(() => {
    socket.on("user:joined", HandleUserJoined);
    return () => {
      socket.off("user:joined", HandleUserJoined);
    };
  }, [socket, HandleUserJoined]);
  return (
    <>
      <h1>Broadcast Room</h1>
      <h4>{remoteSocketId? "Connected To Others":"No One In Room"}</h4>

      {remoteSocketId && <button onClick={handleCallUser}>CALL</button>}
      
      
      {myStream &&<>
      <h1>My Video</h1>
       <ReactPlayer playing={true} muted height={"100px"} width={"200px"} url={myStream}/>
       </>}
    </>
  );
};

export default Room;
