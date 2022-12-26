import {io} from "socket.io-client";
import {Comment, Comments} from "store/types";

const URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

export const apiComments = {
  socket: io(URL, {autoConnect: false}),

  createConnection(userId: string, reviewId: string) {
    this.socket.auth = {userId, reviewId};
    this.socket.connect();
  },

  destroyConnection() {
    this.socket.disconnect();
  },

  subscribe(
    setComments: (comments: Comment[]) => void,
    addComment: (comment: Comment) => void,
  ) {
    this.socket.on('user-connected-to-room', setComments)
    this.socket.on('comment-added', addComment)
  },

  sendComment(comment: Comment) {
    this.socket.emit('sent-comment', comment)
  }


}