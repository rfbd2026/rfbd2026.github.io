CREATE TABLE IF NOT EXISTS contact_inquiries (
  id CHAR(36) NOT NULL,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(254) NOT NULL,
  company VARCHAR(180) NOT NULL DEFAULT '',
  service VARCHAR(32) NOT NULL,
  message TEXT NOT NULL,
  locale CHAR(2) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_contact_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS newsletter_signups (
  id CHAR(36) NOT NULL,
  email VARCHAR(254) NOT NULL,
  locale CHAR(2) NOT NULL,
  consented_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uniq_newsletter_email (email),
  KEY idx_newsletter_consent (consented_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
