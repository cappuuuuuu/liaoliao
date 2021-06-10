let stickers= [];
const addImages = ( name ) =>{
        let items= [] ;
        for(let i = 1 ; i < 9 ; i++){
            items.push(require(`../../assets/sticker/${name}/${name}-${i}.png`));
        }
        stickers.push({
            name,
            imageUrl:items
        });
}


// addImages('pepe-frog');
addImages('rabbit');
addImages('yosistamp');
addImages('panda');
addImages('cat');
addImages('whitebear');
export default stickers ;
