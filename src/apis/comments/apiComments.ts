import { io } from 'socket.io-client';

import { Comment } from 'store/types';

const URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';
const ReconnectionDelay = 500;

export const apiComments = {
  socket: io(URL, { autoConnect: false, reconnectionDelay: ReconnectionDelay }),

  createConnection(reviewId: string) {
    this.socket.auth = { reviewId };
    this.socket.connect();
  },

  destroyConnection() {
    this.socket.disconnect();
    this.socket.off();
  },

  subscribe(
    setComments: (comments: Comment[]) => void,
    addComment: (comment: Comment) => void,
  ) {
    this.socket.on('user-connected-to-room', setComments);
    this.socket.on('comment-added', addComment);
  },

  sendComment(comment: Comment) {
    this.socket.emit('sent-comment', comment);
  },
};
