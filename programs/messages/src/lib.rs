use anchor_lang::prelude::*;

declare_id!("H6dCaZuC28NcQdHCMKPZJwsdLJczbBJogzeJiNuCzZkj");

#[program]
pub mod messages {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>, message: String) -> ProgramResult {
        let base_account = &mut ctx.accounts.base_account;
        let copy = message.clone();
        base_account.message = message;
        base_account.messages.push(copy);
        Ok(())
    }

    pub fn update(ctx: Context<Update>, message: String) -> ProgramResult {
        let base_account = &mut ctx.accounts.base_account;
        let copy = message.clone();
        base_account.message = message;
        base_account.messages.push(copy);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 64 + 64)]
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Update<'info> {
    #[account(mut)]
    pub base_account: Account<'info, BaseAccount>
}

#[account]
pub struct BaseAccount {
    pub message: String,
    pub messages: Vec<String>
}
