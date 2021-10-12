const URI = {};

URI.login = '/';

URI.dashboard = '/dashboard';

// Users
URI.users = {}

URI.User = '/user';
// Transactions
URI.Payments = '/transactions/payment';
URI.Disputes = '/transactions/dispute';
// Dispatches
URI.CompletedDispatch = '/dispatch/completed';
URI.CancelledDispatch = '/dispatch/cancelled';

export default URI;