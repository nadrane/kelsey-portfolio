import React from 'react';

export default function Input() {
  return (
    <div class="field">
      <label class="label">Username</label>
      <div class="control has-icons-left has-icons-right">
        <input class="input is-success" type="text" placeholder="Text input" value="bulma" />
      </div>
      <p class="help is-success"></p>
    </div>
  )
}