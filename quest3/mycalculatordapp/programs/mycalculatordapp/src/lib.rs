use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod mycalculatordapp {
    use super::*;

    pub fun create(ctx: Context<create>, init_message: String) -> ProgramResult {
        let calculator = &mut ctx.accounts.calculator;
        calculator.greeting = init_message;
        ok(())
    }

    pub fun add(ctx: Context<Addition>, num1: i64, num2: i64) -> ProgramResult {

    }
    
    pub fun multiply(ctx: Context<Multiplication>, num1: i64, num2: i64) -> ProgramResult {

    }

    pub fun subtract(ctx: Context<Subtraction>, num1: i64, num2: i64) -> ProgramResult {

    }

    pub fun divide(ctx: Context<Division>, num1: i64, num2: i64) -> ProgramResult {

    }
}

// #[derive(Accounts)]
// pub struct Initialize {}
