export class AuthorizationState {
    responsecode: number;
    responsestatus: string;
    data: AuthorizationStateData;
    message?: string;
}
export class AuthorizationStateData {
    main_panel: MainPanel;
    gw_mgmt: GatewayMgmt;
    route_mgmt: RouteMgmt;
    billplan_mgmt: BillplanMgmt;
    customer_management: CustomerMgmt;
    settings: Settings;
    loggedinempid: number;
    loggedinusername: string;
    role: string;
    timezone: string;
    timeoffset: string;
}
export class MainPanel {
    gw_mgmt_enabled: boolean;
    route_mgmt_enabled: boolean;
    bill_plan_mgmt_enabled: boolean;
    cust_mgmt_enabled: boolean;
    global_settings_enabled: boolean;
}
export class GatewayMgmt {
    gw_listing_enabled: boolean;
    gw_change_status_enabled: boolean;
    gw_create_enabled: boolean;
    gw_edit_enabled: boolean;
    gw_view_enabled: boolean;
    gw_rateupload_enabled: boolean;
    gw_upload_file_template_create_or_edit_enabled: boolean;
    gw_rate_file_upload_through_email_enabled: boolean;
    gw_rate_files_audit_logs_enabled: boolean;
    gw_rate_file_view_or_download_enabled: boolean;
    gw_countries_list_enabled: boolean;
    gw_countries_list_country_operator_status_change_enabled: boolean;
    gw_countries_list_country_operator_test_message_enabled: boolean;
    gw_countries_list_country_operator_history_enabled: boolean;
    gw_countries_list_country_operator_current_rate_download_enabled: boolean;
    gw_whitelisted_senderid_list_enabled: boolean;
    gw_whitelisted_senderid_delete_enabled: boolean;
    gw_blacklisted_senderid_content_list_enabled: boolean;
    gw_blacklisted_senderid_content_add_or_remove_enabled: boolean;
    gw_activity_logs_enabled: boolean;
}
export class RouteMgmt {
    lcr_list_enabled: boolean;
    lcr_gw_activate_or_deactivate_enabled: boolean;
    poolroute_list_enabled: boolean;
    poolroute_list_accounts_tagged_enabled: boolean;
    poolroute_view_enabled: boolean;
    poolroute_delete_enabled: boolean;
    poolroute_clone_enabled: boolean;
    poolroute_create_enabled: boolean;
    customroute_dashboard_enabled: boolean;
    customroute_mobilenumber_list_enabled: boolean;
    customroute_mobilenumber_add_route_enabled: boolean;
    customroute_mobilenumber_delete_route_enabled: boolean;
    customroute_senderidcontent_list_enabled: boolean;
    customroute_senderidcontent_add_route_enabled: boolean;
    customroute_senderidcontent_delete_route_enabled: boolean;
    customroute_mobilesenderid_list_enabled: boolean;
    customroute_mobilesenderid_add_route_enabled: boolean;
    customroute_mobilesenderid_delete_route_enabled: boolean;
    blacklist_dashboard_enabled: boolean;
    blacklist_mobilenumber_list_enabled: boolean;
    blacklist_mobilenumber_add_enabled: boolean;
    blacklist_mobilenumber_delete_enabled: boolean;
    blacklist_senderidcontent_list_enabled: boolean;
    blacklist_senderidcontent_add_enabled: boolean;
    blacklist_senderidcontent_delete_enabled: boolean;
    blacklist_mobilesenderid_list_enabled: boolean;
    blacklist_mobilesenderid_add_enabled: boolean;
    blacklist_mobilesenderid_delete_enabled: boolean;
}
export class BillplanMgmt {
    billplan_dashboard_enabled: boolean;
    billplan_list_enabled: boolean;
    billplan_view_enabled: boolean;
    billplan_create_enabled: boolean;
    billplan_create_ratecard_enabled: boolean;
    billplan_view_ratecard_enabled: boolean;
    billplan_assign_ratecard_enabled: boolean;
    billplan_delete_ratecard_enabled: boolean;
}
export class CustomerMgmt {
    // new_account_pending_for_activation_esmes_tab_enabled: boolean;
    // new_account_pending_for_activation_esme_show_margin_enabled: boolean;
    // new_account_creation_review_enabled: boolean;
    // new_account_creation_pending_from_Activation_enabled: boolean;
    // new_account_creation_view_billplan_ratecard_enabled: boolean;
    // new_account_creation_change_additional_setting_enabled: boolean;
    // new_account_creation_profit_margin_report_enabled: boolean;
    // cust_pending_for_activation_esmes_tab_enabled: boolean;
    // cust_pending_for_activation_esme_show_margin_enabled: boolean;
    // cust_existing_customers_tab_enabled: boolean;
    // cust_existing_view_billpplan_ratecard_enabled: boolean;
    // cust_existing_change_additional_setting_enabled: boolean;
    // cust_existing_customer_show_margin_enabled: boolean;
    // cust_existing_customer_audit_logs_enabled: boolean;
    // cust_existing_customer_test_message_enabled: boolean;
    // cust_existing_customer_detailed_view_enabled: boolean;
    // cust_existing_customer_detailed_view_listing_whitelisted_senderids_enabled: boolean;
    // cust_existing_customer_detailed_view_listing_blocked_senderids_enabled: boolean;
    // cust_existing_customer_detailed_view_listing_allowed_countries_operators_list_enabled: boolean;
    // cust_existing_customer_detailed_view_allowed_countries_operators_add_or_delete_alternate_senderids_enabled: boolean;
    // cust_existing_customer_detailed_view_activity_logs_enabled: boolean;
    cust_pending_for_activation_enabled: boolean;
    cust_pending_for_activation_show_margin_enabled: boolean;
    cust_existing_customers_enabled: boolean;
    cust_existing_customer_show_margin_enabled: boolean;
    cust_existing_customer_audit_logs_enabled: boolean;
    cust_existing_customer_test_routing_enabled: boolean;
    cust_existing_customer_detailed_view_enabled: boolean;
    cust_existing_customer_detailed_view_listing_whitelisted_senderids_enabled: boolean;
    cust_existing_customer_detailed_view_listing_blocked_senderids_enabled: boolean;
    cust_existing_customer_detailed_view_listing_allowed_countries_operators_list_enabled: boolean;
    cust_existing_customer_detailed_view_allowed_countries_operators_add_or_delete_alternate_senderids_enabled: boolean;

    cust_pending_acct_review_enabled: boolean;
    cust_pending_routing_change_enabled: boolean;
    cust_pending_view_billplan_ratecard_enabled: boolean;
    cust_pending_additional_settings_enabled: boolean;
    cust_existing_routing_change_enabled: boolean;
    cust_existing_view_billplan_ratecard_enabled: boolean;
    cust_existing_additional_settings_enabled: boolean;
    cust_existing_customer_detailed_view_activity_logs_enabled: boolean;
}
export class Settings {
    settings_standard_rate_card_view_enabled: boolean;
    settings_global_country_operator_listing_enabled: boolean;
    settings_global_country_operator_add_mobile_series_enabled: boolean;
    settings_global_country_operator_delete_mobile_series_enabled: boolean;
    settings_global_country_operator_add_senderids_enabled: boolean;
    settings_global_country_operator_test_message_enabled: boolean;
    settings_global_country_operator_download_enabled: boolean;
    settings_currency_conversion_rates_view_audit_log_enabled: boolean;
    settings_billplan_invoice_currency_conversion_rates_view_audit_log_enabled: boolean;
    settings_set_or_update_normalize_rate_currency_enabled: boolean;
    settings_set_or_update_timezone_enabled: boolean;
}