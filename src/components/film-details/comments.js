import {commentsTimeFormat} from '../../utils/common.js';
import AbstractComponent from './../abstract-component.js';
import {EMOJIS} from '../../const.js';

const INPUT_CHECKED = `checked`;

const createCommentsMarkup = (comments) => {
  return comments.map((comment) => {
    const {authorName, text, emoji, date} = comment;
    return `<li class="film-details__comment">
              <span class="film-details__comment-emoji">
                <img src="${emoji}" width="55" height="55" alt="emoji">
              </span>
              <div>
                <p class="film-details__comment-text">${text}</p>
                <p class="film-details__comment-info">
                  <span class="film-details__comment-author">${authorName}</span>
                  <span class="film-details__comment-day">${commentsTimeFormat(date)}</span>
                  <button class="film-details__comment-delete">Delete</button>
                </p>
              </div>
            </li>`;
  }).join(``);
};

const createEmojiMarkup = (emojis, userEmoji) => {
  return emojis.map((emoji) => {
    const isChecked = emoji === userEmoji ? INPUT_CHECKED : ``;
    return `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value=${emoji} ${isChecked}>
              <label class="film-details__emoji-label" for="emoji-${emoji}">
                <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
            </label>`;
  }).join(``);
};

const createCommentsTemplate = (comments, emoji) => {
  const commentsMarkup = createCommentsMarkup(comments);

  return `<div class="form-details__bottom-container">
            <section class="film-details__comments-wrap">
              <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
              <ul class="film-details__comments-list">
                ${commentsMarkup}
              </ul>

              <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label">
                ${emoji ? `<img src="images/emoji/${emoji}.png" width="55" height="55" alt="emoji">` : ``} 
              </div>
    
              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>
    
              <div class="film-details__emoji-list">
                ${createEmojiMarkup(EMOJIS, emoji)}
              </div>
              </div>
            </section>
          </div>`;
};

export default class Comments extends AbstractComponent {
  constructor(comments, emoji) {
    super();
    this._comments = comments;
    this._emoji = emoji;
  }

  getTemplate() {
    return createCommentsTemplate(this._comments, this._emoji);
  }
}
