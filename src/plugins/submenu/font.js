/*
 * wysiwyg web editor
 *
 * suneditor.js
 * Copyright 2017 JiHong Lee.
 * MIT license.
 */
'use strict';

import util from '../../lib/util';

export default {
    name: 'font',
    add: function (core, targetElement) {
        /** set submenu */
        let listDiv = eval(this.setSubmenu(core.context.option));

        /** add event listeners */
        listDiv.getElementsByClassName('list_family')[0].addEventListener('click', this.pickup.bind(core));

        /** append html */
        targetElement.parentNode.appendChild(listDiv);

        /** empty memory */
        listDiv = null;
    },

    setSubmenu: function (option) {
        const listDiv = util.createElement('DIV');
        listDiv.className = 'layer_editor';
        listDiv.style.display = 'none';

        let font, text, i, len;
        let fontList = !option.font ?
            [
                'Arial',
                'Comic Sans MS',
                'Courier New,Courier',
                'Impact,Charcoal,sans-serif',
                'Georgia',
                'tahoma',
                'Trebuchet MS,Helvetica',
                'Verdana'
            ] : option.font;

        let list = '<div class="sun-editor-submenu inner_layer list_family">' +
            '   <ul class="list_editor sun-editor-list-font-family">';
        for (i = 0, len = fontList.length; i < len; i++) {
            font = fontList[i];
            text = font.split(',')[0];
            list += '<li><button type="button" class="btn_edit" data-value="' + font + '" data-txt="' + text + '" title="' + text + '" style="font-family:' + font + ';">' + text + '</button></li>';
        }
        list += '   </ul>';
        list += '</div>';
        listDiv.innerHTML = list;

        return listDiv;
    },

    pickup: function (e) {
        if (!/^BUTTON$/i.test(e.target.tagName)) {
            return false;
        }

        e.preventDefault();
        e.stopPropagation();

        const target = e.target;

        util.changeTxt(this.context.tool.font, target.getAttribute('data-txt'));
        const newNode = util.createElement('SPAN');
        newNode.style.fontFamily = target.getAttribute('data-value');
        this.nodeChange(newNode, ['font-family']);
        
        this.submenuOff();
        this.focus();
    }
};
