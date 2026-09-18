const uidGenerator = (user) => {

    const userId = user._id.toString();

    console.log(userId);

    return userId.substring(0, 11);
};

module.exports = uidGenerator;