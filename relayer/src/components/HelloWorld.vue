<template>
    <div class="nft">
        <div class="mint">
            <p>mintNFT</p><br>
            tokenId：<input v-model="tokenId"> <br/>
            amount：<input v-model="amount"><br/>
            tokenData：<input v-model="tokenData"><br/>
            <button @click="mint">mint</button>
        </div>

        <div class="vote">
            <p>投票</p><br>
            tokenId：<input v-model="voteId"> <br/>
            <button @click="vote">vote</button>
        </div>

        <div class="voteresult">
            <p>获取投票结果</p><br>
            Id：<input v-model="id"> <br/>
            <button @click="getVoteResult">getVoteResult</button>
        </div>

        <div class="approval">
            <p>挂单</p><br>
            operator：<input v-model="operator"> <br/>
            <button @click="approval">挂单</button>
        </div>

        <div class="getApproval">
            <p>获取挂单结果</p><br>
            operator：<input v-model="operator"> <br/>
            <button @click="getApproval">获取挂单结果</button>
        </div>
    </div>
</template>
<script>
    import {ethers} from 'ethers';
    import axios from '@/utils/axios.js';

    export default {
        data() {
            return {
                tokenId: "",
                amount: "",
                tokenData: "",
                signer: "",
                voteId: "",
                id: "",
                operator: ""
            }
        },
        methods: {
            async mint() {
                const mnemonic = "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol";
                const wallet = ethers.Wallet.fromMnemonic(mnemonic, `m/44'/60'/0'/0/0`);
                let address = wallet.address;
                console.log("address:" + address)
                let message = address + this.tokenId + this.amount + this.tokenData;

                let signMessage = await wallet.signMessage(message);
                console.log("signMessage:" + signMessage)
                let data = {
                    "address": address,
                    "id": this.tokenId,
                    "amount": this.amount,
                    "data": this.tokenData,
                    "message": message,
                    "signMessage": signMessage
                };
                axios.post('/api/relayer/mint', data).then(res => {
                    console.log(res);
                });
            },
            async vote() {
                const mnemonic = "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol";
                const wallet = ethers.Wallet.fromMnemonic(mnemonic, `m/44'/60'/0'/0/0`);
                let address = wallet.address;
                console.log("address:" + address)
                let message = address + this.voteId;

                let signMessage = await wallet.signMessage(message);
                console.log("signMessage:" + signMessage)
                let data = {
                    "address": address,
                    "id": this.voteId,
                    "message": message,
                    "signMessage": signMessage
                };
                axios.post('/api/relayer/voteInfo', data).then(res => {
                    console.log(res);
                });
            },
            async getVoteResult() {
                let data = {
                    "id": this.id,
                };
                axios.post('/api/relayer/getVoteResult', data).then(res => {
                    console.log(res);
                });
            },
            async approval() {
                const mnemonic = "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol";
                const wallet = ethers.Wallet.fromMnemonic(mnemonic, `m/44'/60'/0'/0/0`);
                let address = wallet.address;
                console.log("address:" + address)
                let message = address + this.operator;

                let signMessage = await wallet.signMessage(message);
                console.log("signMessage:" + signMessage)
                let data = {
                    "owner": address,
                    "operator": this.operator,
                    "message": message,
                    "signMessage": signMessage
                };
                axios.post('/api/relayer/approval', data).then(res => {
                    console.log(res);
                });
            },
            async getApproval() {
                const mnemonic = "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol";
                const wallet = ethers.Wallet.fromMnemonic(mnemonic, `m/44'/60'/0'/0/0`);
                let address = wallet.address;
                let data = {
                    "owner": address,
                    "operator": this.operator
                };
                axios.post('/api/relayer/getApproval', data).then(res => {
                    console.log(res);
                });
            },
        }
    }
</script>

<style scoped>
    .mint {
        border: 1px solid black;
        padding: 20px 20px;
    }

    .vote {
        margin-top: 20px;
        border: 1px solid black;
        padding: 20px 20px;
    }

    .nft {
        border: 2px solid black;
        padding: 30px 30px;
    }

    .voteresult {
        margin-top: 20px;
        border: 1px solid black;
        padding: 20px 20px;
    }
    .approval {
        margin-top: 20px;
        border: 1px solid black;
        padding: 20px 20px;
    }
    .getApproval {
        margin-top: 20px;
        border: 1px solid black;
        padding: 20px 20px;
    }

    h1 {
        font-weight: 500;
        font-size: 2.6rem;
        position: relative;
        top: -10px;
    }

    h3 {
        font-size: 1.2rem;
    }

    .greetings h1,
    .greetings {
        text-align: center;
        align-items: center;
    }

</style>
