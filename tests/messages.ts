import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { Messages } from '../target/types/messages';
import assert from 'assert';

const { SystemProgram } = anchor.web3;

describe('messages', () => {

  const provider = anchor.Provider.env();
  // Configure the client to use the local cluster.
  anchor.setProvider(provider);
  let baseAccount;

  before(() => {
    baseAccount = anchor.web3.Keypair.generate();
  })

  const program = anchor.workspace.Messages as Program<Messages>;

  it('Initializes an account', async () => {
    await program.rpc.initialize('Test Message', {
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [baseAccount]
    });

    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('Message: ', account.message);
    assert.ok(account.message === 'Test Message');
  });

  it('Updates a previously created account', async () => {
    await program.rpc.update("New Message yo!", {
      accounts: {
        baseAccount: baseAccount.publicKey,
      }
    });

    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('Updated Message', account.message);
    assert.ok(account.message === 'New Message yo!');
    console.log('All Messages', account.messages);
    assert.ok(account.messages.length === 2);
  })
});
