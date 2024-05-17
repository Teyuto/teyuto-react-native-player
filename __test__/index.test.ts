import { expect } from 'chai';
import TeyutoPlayer, { PlayerProps } from '../src/index';

const getEmbedUrlForConfig = (config: PlayerProps) => new TeyutoPlayer(config).buildEmbedUrl(config);

describe('Embed URL are properly generated', () => {
    it('generate simple urls', () => {
        expect(getEmbedUrlForConfig({id: "123456"}))
            .to.equal("https://teyuto.tv/video/player?w=123456&pip=off");
    });
});
