import addEvent from './addEvent';
import triggerEvent from './triggerEvent';
import getAriaLabel from './getAriaLabel';
import * as lightboxHelper from '../Helper/Lightbox';

const openexternal = (() => {
    const value = document.currentScript.dataset.openexternal;
    return value ? value.split(',') : [];
})();

const BASE = 'jonnitto-prettyembed';

function markup(node) {
    const DATA = node.dataset;
    const FULLSCREEN = DATA.fs != null;
    if (!DATA.embed) {
        return false;
    }

    return `<iframe src="${DATA.embed}" ${FULLSCREEN ? 'allowfullscreen ' : ''}frameborder="0" allow="${
        FULLSCREEN ? 'fullscreen; ' : ''
    }accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>`;
}

function replace(element, tagName) {
    if (typeof element === 'object' && typeof tagName === 'string') {
        const ORIGINAL_ELEMENT = element;
        const ORIGINAL_TAG = ORIGINAL_ELEMENT.tagName;
        const START_RX = new RegExp('^<' + ORIGINAL_TAG, 'i');
        const END_RX = new RegExp(ORIGINAL_TAG + '>$', 'i');
        const START_SUBST = '<' + tagName;
        const END_SUBST = tagName + '>';
        const WRAPPER = document.createElement('div');
        WRAPPER.innerHTML = ORIGINAL_ELEMENT.outerHTML.replace(START_RX, START_SUBST).replace(END_RX, END_SUBST);
        const NEW_ELEMENT = WRAPPER.firstChild;
        element.parentNode.replaceChild(NEW_ELEMENT, element);
        return NEW_ELEMENT;
    }
}

function getImage(node) {
    const IMAGE = node.querySelector('img');
    return {
        node: IMAGE || null,
        src: IMAGE ? IMAGE.getAttribute('src') : null,
    };
}

function getPaddingTop(node, fallback = '56.25%') {
    // 56.25% is a 16:9 in percent

    if (node.dataset.ratio) {
        return node.dataset.ratio;
    }

    const IMAGE = getImage(node);
    if (!IMAGE.node) {
        return fallback;
    }
    const RATIO = (parseInt(IMAGE.node.naturalHeight) / parseInt(IMAGE.node.naturalWidth)) * 100;
    if (typeof RATIO != 'number') {
        return fallback;
    }
    return RATIO + '%';
}

function write(link, playClass, type) {
    if (checkGdpr(link, type)) {
        const IFRAME = markup(link);
        const IMAGE = getImage(link);
        if (!IFRAME) {
            return;
        }
        const ELEMENT = replace(link, 'div');
        ELEMENT.classList.add(playClass);
        ELEMENT.style.paddingTop = getPaddingTop(link);
        ELEMENT.innerHTML = IFRAME;

        if (IMAGE.src) {
            ELEMENT.setAttribute('data-img', IMAGE.src);
        }
        triggerEvent({
            type: type,
            style: 'inline',
            title: getAriaLabel(link),
            src: link.dataset.embed,
        });
    }
}

function checkGdpr(element, type) {
    const GDPR = element.dataset.gdpr;

    if (!GDPR) {
        return true;
    }

    const LOCAL_STORAGE = window.localStorage;
    const STORAGE_KEY = `jonnittoprettyembed_gdpr_${type}`;

    if (LOCAL_STORAGE[STORAGE_KEY] === 'true' || confirm(GDPR)) {
        element.removeAttribute('data-gdpr');
        LOCAL_STORAGE[STORAGE_KEY] = 'true';
        return true;
    }
    return false;
}

function restore(element, playClass) {
    const IMAGE = element.getAttribute('data-img') || false;
    if (IMAGE) {
        element.classList.remove(playClass);
        element.removeAttribute('style');
        element.innerHTML = `<img src="${IMAGE}" />`;
        replace(element, 'a');
    }
}

function lightbox(type) {
    if (openexternal.includes(type)) {
        return;
    }

    const SELECTOR = `a.${BASE}--${type}.${BASE}--lightbox`;

    lightboxHelper.init(SELECTOR, function (event) {
        const HTML = markup(this);
        if (HTML) {
            event.preventDefault();
            if (checkGdpr(this, type)) {
                const PADDING_TOP = getPaddingTop(this);
                lightboxHelper.get([type, 'iframe'], PADDING_TOP).innerHTML = HTML;
                lightboxHelper.show(() => {
                    if (!this.dataset.init) {
                        this.dataset.init = true;
                        triggerEvent({
                            type: type,
                            style: 'lightbox',
                            title: getAriaLabel(this),
                            src: this.dataset.embed,
                        });
                    }
                });
            }
        }
    });
}

function embed(type) {
    if (openexternal.includes(type)) {
        return;
    }
    const SELECTOR = `a.${BASE}--${type}.${BASE}--inline`;
    const PLAY_CLASS = `${BASE}--play`;

    addEvent(SELECTOR, function (event) {
        event.preventDefault();
        write(this, PLAY_CLASS, type);
    });
}

export { markup, replace, write, restore, lightbox, embed };
