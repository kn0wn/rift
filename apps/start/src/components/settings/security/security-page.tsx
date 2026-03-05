'use client'

import { Form } from '@rift/ui/form'
import { ContentPage } from '@/components/layout'
import { m } from '@/paraglide/messages.js'
import { MfaSection } from './mfa-section'
import { useSecurityPageLogic } from './security-page.logic'
import { SessionList } from './session-list'

/**
 * User security settings page for updating account password.
 */
export function SecurityPage() {
  const {
    currentPassword,
    newPassword,
    confirmPassword,
    passwordMessage,
    sessionsMessage,
    mfaEnabled,
    mfaPendingVerification,
    mfaBusy,
    mfaMessage,
    mfaSetupTotpURI,
    mfaBackupCodes,
    mfaSetupPassword,
    mfaSetupCode,
    mfaDisablePassword,
    activeSessions,
    sessionsLoaded,
    sessionsLoading,
    revokingSessionToken,
    revokingAllOtherSessions,
    canEdit,
    setCurrentPasswordInput,
    setNewPasswordInput,
    setConfirmPasswordInput,
    setMfaSetupPasswordInput,
    setMfaSetupCodeInput,
    setMfaDisablePasswordInput,
    submitPasswordChange,
    enableMfa,
    verifyMfaTotp,
    cancelMfaSetup,
    finishMfaSetup,
    disableMfa,
    mfaSetupStep,
    revokeSessionByToken,
    revokeAllOtherSessions,
  } = useSecurityPageLogic()
  const passwordSuccessMessage =
    passwordMessage === m.settings_security_success() ? passwordMessage : undefined

  // Reveal the confirm + current fields only once the user starts typing a new password.
  // This keeps the form compact and guides the user through the flow step-by-step.
  const showExtraFields = newPassword.trim().length > 0
  const otherSessionsCount = activeSessions.filter((session) => !session.isCurrent).length

  return (
    <ContentPage
      title={m.settings_security_page_title()}
      description={m.settings_security_page_description()}
    >
      <Form
        title={m.settings_security_form_title()}
        description={m.settings_security_form_description()}
        inputFields={[
          {
            name: 'newPassword',
            label: m.settings_security_label_new_password(),
            inputAttrs: {
              type: 'password',
              autoComplete: 'new-password',
              disabled: !canEdit,
            },
            value: newPassword,
            onValueChange: setNewPasswordInput,
          },
          {
            name: 'confirmPassword',
            label: m.settings_security_label_confirm_password(),
            hidden: !showExtraFields,
            inputAttrs: {
              type: 'password',
              autoComplete: 'new-password',
              disabled: !canEdit,
            },
            value: confirmPassword,
            onValueChange: setConfirmPasswordInput,
          },
          {
            name: 'currentPassword',
            label: m.settings_security_label_current_password(),
            hidden: !showExtraFields,
            inputAttrs: {
              type: 'password',
              autoComplete: 'current-password',
              disabled: !canEdit,
            },
            value: currentPassword,
            onValueChange: setCurrentPasswordInput,
          },
        ]}
        buttonText={m.settings_security_button_update_password()}
        buttonDisabled={
          !canEdit ||
          currentPassword.trim().length === 0 ||
          newPassword.trim().length === 0 ||
          confirmPassword.trim().length === 0
        }
        handleSubmit={async () => {
          await submitPasswordChange()
        }}
        error={
          passwordMessage != null && passwordMessage !== m.settings_security_success()
            ? passwordMessage
            : undefined
        }
        success={passwordSuccessMessage}
        helpText={
          <p className="text-sm text-content-subtle">
            {m.settings_security_help_sessions()}
          </p>
        }
      />

      <Form
        title={m.settings_security_sessions_title()}
        description={m.settings_security_sessions_description()}
        contentSlot={
          <div className="space-y-3">
            <SessionList
              activeSessions={activeSessions}
              sessionsLoaded={sessionsLoaded}
              canEdit={canEdit}
              revokingSessionToken={revokingSessionToken}
              revokingAllOtherSessions={revokingAllOtherSessions}
              onRevokeSession={revokeSessionByToken}
            />
          </div>
        }
        forceActions
        buttonText={m.settings_security_sessions_revoke_others_button()}
        buttonVariant="dangerLight"
        buttonDisabled={
          !canEdit ||
          sessionsLoading ||
          revokingSessionToken != null ||
          revokingAllOtherSessions ||
          otherSessionsCount === 0
        }
        handleSubmit={async () => {
          await revokeAllOtherSessions()
        }}
        helpText={
          sessionsMessage ? (
            <p className="text-sm text-content-subtle">{sessionsMessage}</p>
          ) : (
            <p className="text-sm text-content-subtle">{m.settings_security_sessions_help_revoke()}</p>
          )
        }
      />

      <MfaSection
        canEdit={canEdit}
        mfaEnabled={mfaEnabled}
        mfaPendingVerification={mfaPendingVerification}
        mfaBusy={mfaBusy}
        mfaMessage={mfaMessage}
        mfaSetupTotpURI={mfaSetupTotpURI}
        mfaBackupCodes={mfaBackupCodes}
        mfaSetupPassword={mfaSetupPassword}
        mfaSetupCode={mfaSetupCode}
        mfaDisablePassword={mfaDisablePassword}
        setMfaSetupPasswordInput={setMfaSetupPasswordInput}
        setMfaSetupCodeInput={setMfaSetupCodeInput}
        setMfaDisablePasswordInput={setMfaDisablePasswordInput}
        enableMfa={enableMfa}
        verifyMfaTotp={verifyMfaTotp}
        cancelMfaSetup={cancelMfaSetup}
        finishMfaSetup={finishMfaSetup}
        disableMfa={disableMfa}
        mfaSetupStep={mfaSetupStep}
      />
    </ContentPage>
  )
}
