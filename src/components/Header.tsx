import type { User } from '../data/users'

interface HeaderProps {
  user: User
  onSignOut: () => void
}

export default function Header({ user, onSignOut }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-brand">ATS Client</div>
      <div className="header-user">
        <span>{user.name ? `${user.name} (${user.email})` : user.email}</span>
        <button type="button" className="btn header-signout" onClick={onSignOut}>
          Sign out
        </button>
      </div>
    </header>
  )
}
