import { toNano } from '@ton/core';
import { ParimutuelBet } from '../wrappers/ParimutuelBet';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const parimutuelBet = provider.open(
        ParimutuelBet.createFromConfig(
            {
                id: Math.floor(Math.random() * 10000),
                counter: 0,
            },
            await compile('ParimutuelBet')
        )
    );

    await parimutuelBet.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(parimutuelBet.address);

    console.log('ID', await parimutuelBet.getID());
}
