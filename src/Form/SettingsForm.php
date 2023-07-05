<?php

namespace Drupal\openai_stuff\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Configure openai stuff settings for this site.
 */
class SettingsForm extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'openai_stuff_settings';
  }

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return ['openai_stuff.settings'];
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $form['openai_api_key'] = [
      '#type' => 'textfield',
      '#title' => $this->t('OpenAI API key'),
      '#default_value' => $this->config('openai_stuff.settings')->get('openai_api_key'),
    ];
    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $this->config('openai_stuff.settings')
      ->set('openai_api_key', $form_state->getValue('openai_api_key'))
      ->save();
    parent::submitForm($form, $form_state);
  }

}
