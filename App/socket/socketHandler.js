let activeUsers = {};

const handleSocketConnection = (io) => {
  io.on("connection", (socket) => {
    console.log("New user connected");

    socket.on("join_note", ({ noteId }) => {
      socket.join(noteId);
      if (!activeUsers[noteId]) activeUsers[noteId] = 0;
      activeUsers[noteId]++;
      io.to(noteId).emit("active_users", activeUsers[noteId]);
    });

    socket.on("note_update", ({ noteId, content }) => {
      socket.to(noteId).emit("receive_update", content);
    });

    socket.on("disconnecting", () => {
      const rooms = [...socket.rooms].filter((r) => r !== socket.id);
      rooms.forEach((noteId) => {
        if (activeUsers[noteId]) {
          activeUsers[noteId]--;
          io.to(noteId).emit("active_users", activeUsers[noteId]);
        }
      });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

module.exports = handleSocketConnection;
