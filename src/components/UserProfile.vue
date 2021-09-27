<template>
    <div class="user-profile">

        <div class="user-profile_user-panel">
            <h1 class="user-profile_username">@{{ user.username }}</h1>

            <div class="user-profile_admin-badge" 
            v-if="user.isAdmin">Admin</div>

            <div class="user-profile_follower-count">
                <strong>Followers: </strong> {{ followers }}
            </div>

            <form class="user-profile_create-twoot" @submit.prevent="createNewTwoot" :class="{ '--exceeded': newTwootCharacterCount > 180 }">
                <label for="newTwoot">
                  <strong>New Twoot {{ newTwootCharacterCount  }}/180 </strong>
                </label>
                <textarea id="newTwoot" rows="4" v-model="newTwootContent"></textarea>

                <div class="user-profile_create-twoot-type">
                    <label for="newTwootType"><strong>Type: </strong></label>
                     <select id="newTwootType" v-model="selectTwootType">
                        <option :value="option.value" v-for="(option, index) in twootTypes" :key="index">
                            {{ option.name }}
                        </option>
                    </select>
                </div>

                <button>
                    Twoot!
                </button>
            </form>
        </div>

        <div class="user-profile_twoots-wrapper">
            <TwootItem v-for="twoot in user.twoots" 
                :key="twoot.id" 
                :username="user.username" 
                :twoot="twoot" 
                @favourite="toggleFavourite"
            />
        </div>

    </div>
</template>

<script>

import TwootItem from './Twootitem'

export default {

  name: 'UserProfile',

  components: { TwootItem },

  data() {

    return {

        newTwootContent: '',
        selectTwootType: 'instant',
        twootTypes: [
          { value: 'draft', name: 'Draft' },
          { value: 'instant', name: 'Instant Twoot' }
      ], 
      followers: 0,
      user: {
        id: 1,
        username: '_jesseOjih',
        firstName: 'Jesse',
        lastName: 'Ojih',
        email: 'jcinvent05@gmail.com',
        isAdmin: true,
        twoots: [
            {  id: 1, content: 'Twotter is amazing'  },
            { id: 2, content: 'Helloworld' },
        ]
      }
    }

  }, 

  watch: {
    followers(newFollowerCount, oldFollowerCount) {
      if (oldFollowerCount < newFollowerCount) {
        console.log(`${this.user.username} has gained a follower`);
      }
    }
  },

  computed: {

    fullName() {
      return `${this.user.firstName} ${this.user.lastName}`
    },

    newTwootCharacterCount() {
      return this.newTwootContent.length 
    }

  },

  methods: {

    followUser() {
      this.followers++
    },

    toggleFavourite(id) {
        console.log(id)  
    },

    createNewTwoot() {
        if(this.newTwootContent && this.selectTwootType !== 'draft') {
            this.user.twoots.unshift({
              id: this.user.twoots.length + 1,
              content: this.newTwootContent
            })

            this.newTwootContent = ''
        }
    }

  },

  mounted() {
    this.followUser()
  }

}

</script>

<style lang="scss" scoped>

.user-profile {
    display: grid;
    grid-template-columns: 1fr 3fr;
    width: 100%;
    padding: 50px 5px;


  .user-profile_user-panel {
      display: flex;
      flex-direction: column;
      margin: 50px;
      margin-right: 50px;
      padding: 20px;
      background-color: white;
      border-radius: 5px;
      border: 1px solid #DFE3E8;


    h1 {
        margin: 0;
    }

    .user-profile_admin-badge {
        background-color: rebeccapurple;
        color: white;
        padding: 0 10px;
        border-radius: 5px;
        margin: 5px 0;
        margin-right: auto;
        font-weight: bold;
    }


    .user-profile_create-twoot{
        /* border-top: 1px solid #DFE3E8; */
        padding-top: 10px;
        margin-top: 10px;
        display: flex;
        flex-direction: column;

        &.--exceeded {
          color: red;
          border-color: red;

          button{
            background-color: red;
            border: none;
            color: #fff;
          }
        }
    }
  }

  .user-profile_twoots-wrapper {
    display: grid;
    grid-gap: 10px  ;
  }
}

</style>