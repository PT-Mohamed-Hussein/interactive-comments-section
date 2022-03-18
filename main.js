const bodyScrollLock = require('body-scroll-lock');
const disableBodyScroll = bodyScrollLock.disableBodyScroll;
const enableBodyScroll = bodyScrollLock.enableBodyScroll;

function getData() {

    return {

        comments: null,
        currentusers: null,
        sendStatus: 'SEND',
        modalStatus: false,
        fetchJsonData() {
            fetch(`data.json`)
                .then(res => res.json())
                .then(data => {
                    this.comments = data.comments;
                    this.currentusers = data.currentUser;
                });
        },
        ChangeCommScoreValue(type, id) {
            if (type == 'increment') {
                let commId = this.comments.findIndex(x => x.id == id)
                this.comments[commId].score += 1
            } else if (type == 'decrement') {
                let commId = this.comments.findIndex(x => x.id == id)
                this.comments[commId].score -= 1
            }
        },
        ChangeReplyScoreValue(type, id, replyId) {
            if (type == 'increment') {
                let commId = this.comments.findIndex(x => x.id == id)
                let repId = this.comments[commId].replies.findIndex(x => x.id == replyId)
                this.comments[commId].replies[repId].score += 1
            } else if (type == 'decrement') {
                let commId = this.comments.findIndex(x => x.id == id)
                let repId = this.comments[commId].replies.findIndex(x => x.id == replyId)
                this.comments[commId].replies[repId].score -= 1
            }
        },
        toggleReplyForComments(currCommID) {
            this.sendStatus = 'REPLY'
            let currCommIndex = this.comments.findIndex(x => x.id == currCommID)
            this.comments[currCommIndex].replyArea = !this.comments[currCommIndex].replyArea
        },
        toggleReplyForReplies(currCommID, repId) {
            this.sendStatus = 'REPLY'
            let currCommIndex = this.comments.findIndex(x => x.id == currCommID)
            let CurrRepId = this.comments[currCommIndex].replies.findIndex(x => x.id == repId)
            this.comments[currCommIndex].replies[CurrRepId].replyArea = !this.comments[currCommIndex].replies[CurrRepId].replyArea

        },
        editReply(currCommID, repId) {
            this.sendStatus = 'EDIT'
            let currCommIndex = this.comments.findIndex(x => x.id == currCommID)
            let CurrRepId = this.comments[currCommIndex].replies.findIndex(x => x.id == repId)
            this.comments[currCommIndex].replies[CurrRepId].replyArea = !this.comments[currCommIndex].replies[CurrRepId].replyArea
        },
    }
}