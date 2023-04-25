extern crate anchor;
use anchor::contract;
use anchor_lang::prelude::Error;
use anchor_lang::prelude::Pubkey;
use std::collections::HashMap;


#[contract]
pub struct NFTStakingContract {
    id: Pubkey,
    metadata: String,
    staked_nft: Pubkey,
    staked_amount: u64,
    reward_factor_per_day: u64,
    staked_balances: HashMap<Pubkey, u64>,
    program_id: Pubkey,
    balances: HashMap<Pubkey, u64>,
}

impl NFTStakingContract {
    pub fn stake(&mut self, nft_id: &Pubkey, amount: u64) -> bool {
        if self.staked_nft != *nft_id {
            return false;
        }

        self.staked_nft = *nft_id;
        self.staked_amount += amount;
        true
    }

    pub fn unstake(&mut self, nft_id: &Pubkey) -> bool {
        if self.staked_nft != *nft_id {
            return false;
        }

        self.staked_nft = Pubkey::new_unique();
        self.staked_amount = 0;
        true
    }
    
      //an implementation for keeping track of the days staked
      //in order to create some kind of streak
      //leading to the gamification of the site
    pub fn days_staked_tracker(&mut self, staked_amount: u64, days_staked: u64) -> u64{
      if staked_amount != 0 {
        days_staked += 1;
      }
      days_staked
    }
    
    //streak bonus
    pub fn streak_bonus_eligibility(&mut self, days_staked: u64)-> bool{
      if days_staked % 10 == 0 {
        true
      }
      false
    }

    pub fn streak_bonus(&mut self,reward_factor_per_day: u64, days_staked: u64)-> u64{
      let ten_days_streak = self.streak_bonus_eligibility(days_staked);
        if ten_days_streak == true {
          reward_factor_per_day += days_staked / 100;
          reward_factor_per_day
       }
       reward_factor_per_day
    }

    pub fn transfer(&mut self, to: &Pubkey, amount: u64) {
        self.balances.get_mut(to).map(|balance| *balance += amount);
        self.balances.get_mut(&self.program_id).map(|balance| *balance -= amount);
      }

    pub fn get_staked_balance(&self, account_id: &Pubkey) -> u64 {
    let staked_balance = self.staked_balances.get(account_id);
    match staked_balance {
      Some(balance) => *balance,
      None => 0,
    }
  }

     pub fn calculate_rewards(&self, staked_tokens: u64, days_staked: u64) -> u64 {
        let long_streak = self.streak_bonus(days_staked);
        if long_streak == 0
        let rewards = staked_tokens * self.reward_factor_per_day * days_staked;
        rewards
      }

      pub fn claim_rewards(&mut self, account_id: &Pubkey) -> Result<(), Error> {
      let staked_tokens = self.get_staked_balance(account_id);
      if staked_tokens == 0 {
       return Err(Error::from_str("You must stake tokens before claiming rewards"));
      }
      
      let days_staked = 0; // Declare the variable before using it
      let rewards = self.calculate_rewards(staked_tokens, days_staked)//this wil always result to zero;
      
      
      self.transfer(account_id, rewards);
      Ok(())
    }
}
       