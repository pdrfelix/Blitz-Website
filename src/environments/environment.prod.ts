export const environment = {
  production: true,
  default_language: 'fr',
  multilingual_activated: false,
  tomato_per_timeslot: 4,
  tomato_per_retirement: 20,
  url_base_api: 'https://api.thesez-vous.org',
  environment_paysafe: 'LIVE',
  // tslint:disable-next-line:max-line-length
  token_paysafe: 'U1VULTIwNzI3MjpCLXAxLTAtNWI5Mjg5OTItMC0zMDJjMDIxNDczNDgwYjc5NjM5OTRiZDRjMDFlYTQxODhlMzMxZmEwYWRlNjU3NDIwMjE0NjMzMGQ5OGQ0YjFiYTA3YjNjNmVmYjMxNTJlMWQyMTljNTI0MjI1ZA==',
  paths_api: {
    activation: '/users/activate',
    authentication: '/authentication',
    users: '/users',
    users_export: '/users/export',
    organizations: '/organizations',
    organizations_export: '/organizations/export',
    domains: '/domains',
    academic_fields: '/academic_fields',
    academic_fields_export: '/academic_fields/export',
    academic_levels: '/academic_levels',
    academic_levels_export: '/academic_levels/export',
    reset_password: '/reset_password',
    change_password: '/change_password',
    activate_user: '/users/activate',
    workplaces: '/workplaces',
    workplaces_export: '/workplaces/export',
    profile: '/profile',
    time_slots: '/time_slots',
    time_slots_export: '/time_slots/export',
    time_slots_batch: '/time_slots/batch_create',
    periods: '/periods',
    periods_export: '/periods/export',
    memberships: '/memberships',
    memberships_export: '/memberships/export',
    reservationPackages: '/packages',
    reservationPackages_export: '/packages/export',
    pictures: '/pictures',
    cards: '/payment_profiles',
    orders: '/orders',
    orders_export: '/orders/export',
    orders_validate: '/orders/validate_coupon',
    orderLines_export: '/order_lines/export',
    reservations: '/reservations',
    reservations_export: '/reservations/export',
    custom_payments: '/custom_payments',
    retirements: '/retirement/retirements',
    retirementReservations: '/retirement/reservations',
    coupons: '/coupons',
    coupons_use_export: '/coupon_uses/export',
    retirement_waiting_queues: '/retirement/wait_queues',
    retirement_waiting_queue_notifications: '/retirement/wait_queue_notifications',
  }
};
