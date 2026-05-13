/* JS States */

.menu-open .main-nav {
  display: flex;
  position: fixed;
  top: 92px;
  right: 16px;
  left: 16px;
  z-index: 150;
  flex-direction: column;
  padding: 18px;
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 24px 70px rgba(15, 23, 42, 0.16);
  backdrop-filter: blur(26px) saturate(160%);
  -webkit-backdrop-filter: blur(26px) saturate(160%);
}

.menu-open .main-nav a {
  width: 100%;
  text-align: center;
}

.site-header.scrolled {
  box-shadow: 0 20px 70px rgba(15, 23, 42, 0.14);
}

.active-link {
  color: var(--primary) !important;
  background: rgba(10, 132, 255, 0.1) !important;
}

.reveal-item {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.reveal-item.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.custom-toast {
  position: fixed;
  right: 20px;
  bottom: 24px;
  z-index: 999;
  display: flex;
  align-items: center;
  gap: 10px;
  max-width: calc(100% - 40px);
  padding: 14px 18px;
  border-radius: 18px;
  color: #111827;
  font-weight: 800;
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(255, 255, 255, 0.85);
  box-shadow: 0 20px 60px rgba(15, 23, 42, 0.18);
  backdrop-filter: blur(24px) saturate(160%);
  -webkit-backdrop-filter: blur(24px) saturate(160%);
  opacity: 0;
  transform: translateY(18px);
  pointer-events: none;
  transition: 0.3s ease;
}

.custom-toast.show {
  opacity: 1;
  transform: translateY(0);
}

.custom-toast.success i {
  color: var(--green);
}

.custom-toast.error i {
  color: var(--danger);
}

.dock-hidden {
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
  pointer-events: none;
}