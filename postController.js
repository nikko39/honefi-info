const axios = require('axios')
const Graphic = require('./models/graphic')
const Launchpad = require('./models/launchpad')
class PostController{
    
    async price(req,res,next) {
        try{
            const id = req.params.id;
            const data = await Graphic.findOne({_id:"6376db2cd96e044971a2910b"})
            return res.json(data.rows[id])
        } catch(e) {
            console.log(e)
        }
    }

    async createLaunch(req, res,next) {
        try{
            const data = await Launchpad.create({
                id: 50,
                header: "RoT Token Launch",
                logo: 'QmWMdszMng6Ur6irTX194TDLakGkEteUMwWsZ73rrcZFXP',
                header_p: 'Change your playstyle on the run. Equip different kinds of weapons to receive different classes and archetypes. Discover combinations of weapons, armor, attributes and skills to create your personal playstyle. And then just change it to another to surprise your opponents.',
                description_img: 'QmTiHH9sWkYdKRFmwsQKENvqkU1huorXnCBjiNbARyaUmP',
                description_header_p: `In a couple months, millions of gamers begin their journey in this new cyberpunk universe. Massive wars between clans brought attention of world’s largest corporations. They became the first owners of the most valuable in-game resource - Cells. Small electronic devices that allow users to open a personal in-game sub-dimension with an access to building their private piece of world, bringing the owners not only virtual property, but also a huge financial benefit. Players understood that the one who controls Cells - controls the Hive itself. Will you become the one who will challenge huge corporations in a fight for Hive’s essence?`,
                description_img_1: 'QmSbzuHd6xfe1bPeahV8gvTsRSWb5qU7tVFsLEne78om6a',
                description_img_2: 'Qma9TjphgLH6yZ97kxvNhAeFubhpU1gyCAZK5z8bpmigPg',
                description_p_2: 'This is a CyberConstruct - the being that will represent you in the Hive. The power of the CyberConstruct lies in its Equipment. Witness the evolution of that power - equip a Weapon and Armor to change your CyberConstruct to a new Class. At launch, four Classes will be available - Joker, Empress, Tower and Fortune. More Classes will join the game at a later date, so stay tuned for more news! Create and improve your Clan. Gather your friends and followers. Join the fight against world’s most powerful corporations and other challengers for control over Cell’s, the Hive’s very essence.'
            })
            return res.json({data: true})
        } catch(e) {
            console.log(e)
        }
    }
    
    async getLaunch(req, res,next) {
        try{
            const response = await axios.post('https://testnet.waxsweden.org/v1/chain/get_table_rows',{
                "json":true,"code":"honefidropsx","scope":"honefidropsx","table": "launchpool","lower_bound":null,"upper_bound":null,"index_position":1,"key_type":"","limit":9999,"reverse":false,"show_payer":false
            })
            let array = [];
            for ( let i = 0; i< response.data.rows.length; i++) {
                try{
                    let id = response.data.rows[i].dropnum;
                let date_ = await Launchpad.findOne({id})
                console.log(date_._doc)
                array.push({...response.data.rows[i],...date_._doc})
                } catch(e) {console.log(e)}
            }
            return res.json(array)
        } catch(e) {
            console.log(e)
        }
    }

    async getLaunchId(req, res,next) {
        try{
            let id = req.params.id;
            const data = await Launchpad.findOne({id});
            const response = await axios.post('https://testnet.waxsweden.org/v1/chain/get_table_rows',{
                "json":true,"code":"honefidropsx","scope":"honefidropsx","table": "launchpool","lower_bound":id,"upper_bound":id,"index_position":1,"key_type":"","limit":9999,"reverse":false,"show_payer":false
            })
            const dat_ = response.data.rows[0]
            return(res.json({...data._doc,...dat_}))
        } catch(e) {
            console.log(e)
        }
    }
}


module.exports = new PostController();