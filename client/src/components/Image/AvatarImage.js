let avatars = [];
const addAvatar = (name) => {
    for(let i = 1 ; i < 9 ; i++ ){
        avatars.push(require(`../../assets/${name}/${name}-${i}.png`));
    }
}
addAvatar('avatar');

export default avatars ;
