class UserInfo {
    constructor(data) {
        console.log('mmode', data);
        this.userId = data.id
        this.firstName = data.userInfos.firstName
        this.lastName = data.userInfos.lastName
        this.age = data.userInfos.age
        this.score = data.score
        this.keyData = data.keyData
    }
}

export default UserInfo