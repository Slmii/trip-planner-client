import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  activityTypes: Array<ActivityType>;
  transportationTypes: Array<TransportationType>;
  /** Fetch the current user's favorites */
  myFavorites: TripsResponse;
  /** Fetch a trip. Return a user's trip if current user is the creator of the trip. If not, then only return if trip is publicly available */
  trip?: Maybe<Trip>;
  /** Fetch the current user's Trips */
  myTrips: TripsResponse;
  /** Fetch upcoming Trip */
  myUpcomingTrip?: Maybe<Trip>;
  /** Fetch a list of publicly available Trips */
  publicTrips: TripsResponse;
  /** Fetch the current user that is logged in. This can never be null because we use the @Authorized decorator, if not authorized then it'll throw an error */
  me?: Maybe<User>;
  /** Fetch a list of Users, only for Admins/Dashboard */
  users: Array<User>;
  receivedInvitations: Array<Invitation>;
  sentInvitations: Array<Invitation>;
  validateInvitationToken: TokenValidationResponse;
  getEmailAddressByInvitationToken: Scalars['String'];
  /** Fetch current user's trip activities, this includes both publicly and non-publicly available activities */
  myTripActivities: Array<Activity>;
  /** Fetch trip activities. If current user is the creator of the trip then it includes both public and private activities. If current user is not the creator of the trip then it will only include public activities. */
  tripActivities: Array<Activity>;
  /** Fetch a list of public activities */
  publicActivities: Array<Activity>;
  /** Fetch current user's notifictaions */
  headerNotifications: Array<Notification>;
};


export type QueryMyFavoritesArgs = {
  orderBy?: Maybe<TripSortByInput>;
  pagination: PaginationInput;
  where?: Maybe<TripWhereInput>;
};


export type QueryTripArgs = {
  isCreator?: Maybe<Scalars['Boolean']>;
  tripId: Scalars['Int'];
};


export type QueryMyTripsArgs = {
  orderBy?: Maybe<TripSortByInput>;
  pagination: PaginationInput;
  where?: Maybe<TripWhereInput>;
};


export type QueryPublicTripsArgs = {
  orderBy?: Maybe<TripSortByInput>;
  pagination: PaginationInput;
  where?: Maybe<TripWhereInput>;
};


export type QueryUsersArgs = {
  pagination: PaginationInput;
  orderBy?: Maybe<UserOrderByInput>;
  where?: Maybe<UserWhereInput>;
};


export type QueryValidateInvitationTokenArgs = {
  token: Scalars['String'];
};


export type QueryGetEmailAddressByInvitationTokenArgs = {
  token: Scalars['String'];
};


export type QueryMyTripActivitiesArgs = {
  tripId: Scalars['Int'];
};


export type QueryTripActivitiesArgs = {
  isCreator?: Maybe<Scalars['Boolean']>;
  tripId: Scalars['Int'];
};

export type ActivityType = {
  __typename?: 'ActivityType';
  id: Scalars['Int'];
  uuid: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  type: Scalars['String'];
};


export type TransportationType = {
  __typename?: 'TransportationType';
  id: Scalars['Int'];
  uuid: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  type: Scalars['String'];
};

export type TripsResponse = {
  __typename?: 'TripsResponse';
  totalCount: Scalars['Int'];
  trips: Array<Trip>;
};

export type Trip = {
  __typename?: 'Trip';
  id: Scalars['Int'];
  uuid: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['Int'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  public: Scalars['Boolean'];
  dateFrom: Scalars['DateTime'];
  dateTo: Scalars['DateTime'];
  adults: Scalars['Int'];
  children: Scalars['Int'];
  infants: Scalars['Int'];
  backgroundUrl?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  locations: Array<Location>;
  preparations: Array<Preparation>;
  isInFavorite: Scalars['Boolean'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  uuid: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  name: Scalars['String'];
  status: Scalars['Boolean'];
  locked: Scalars['Boolean'];
  role: Role;
  public: Scalars['Boolean'];
  trips: Array<Trip>;
};

/** Role of the User */
export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type Location = {
  __typename?: 'Location';
  id: Scalars['Int'];
  uuid: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  tripId: Scalars['Int'];
  name: Scalars['String'];
};

export type Preparation = {
  __typename?: 'Preparation';
  id: Scalars['Int'];
  uuid: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  status: Scalars['Boolean'];
  subPreparations: Array<SubPreparation>;
};

export type SubPreparation = {
  __typename?: 'SubPreparation';
  id: Scalars['Int'];
  uuid: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  preparationId: Scalars['Int'];
  name: Scalars['String'];
  status: Scalars['Boolean'];
};

export type TripSortByInput = {
  id?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  adults?: Maybe<SortOrder>;
  children?: Maybe<SortOrder>;
  infants?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  dateFrom?: Maybe<SortOrder>;
  dateTo?: Maybe<SortOrder>;
};

/** Sorting options */
export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type PaginationInput = {
  skip: Scalars['Int'];
  take: Scalars['Int'];
};

export type TripWhereInput = {
  search?: Maybe<StringFilter>;
  searchIn: Array<Scalars['String']>;
  from?: Maybe<DateFilter>;
  to?: Maybe<DateFilter>;
  activityDate?: Maybe<DateFilter>;
  activityType?: Maybe<StringFilter>;
  transportationType?: Maybe<StringFilter>;
};

export type StringFilter = {
  equals?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  notIn?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  startsWith?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  not?: Maybe<Scalars['String']>;
};

export type DateFilter = {
  equals?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Scalars['DateTime']>>;
  notIn?: Maybe<Array<Scalars['DateTime']>>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
  not?: Maybe<Scalars['DateTime']>;
};

export type UserOrderByInput = {
  id?: Maybe<SortOrder>;
  email?: Maybe<SortOrder>;
  firstName?: Maybe<SortOrder>;
  lastName?: Maybe<SortOrder>;
  status?: Maybe<SortOrder>;
  locked?: Maybe<SortOrder>;
  role?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
};

export type UserWhereInput = {
  email?: Maybe<StringFilter>;
  firstName?: Maybe<StringFilter>;
  lastName?: Maybe<StringFilter>;
  status?: Maybe<BoolFilter>;
  locked?: Maybe<BoolFilter>;
  role?: Maybe<Role>;
  from?: Maybe<DateFilter>;
  to?: Maybe<DateFilter>;
};

export type BoolFilter = {
  equals?: Maybe<Scalars['Boolean']>;
  not?: Maybe<Scalars['Boolean']>;
};

export type Invitation = {
  __typename?: 'Invitation';
  id: Scalars['Int'];
  uuid: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  activityId: Scalars['Int'];
  email: Scalars['String'];
  status: ActivityInvitationStatus;
  expiresAt: Scalars['DateTime'];
  activity?: Maybe<Activity>;
  user?: Maybe<User>;
};

/** Status of the activity invitation */
export enum ActivityInvitationStatus {
  Pending = 'PENDING',
  Accepted = 'ACCEPTED',
  Rejetced = 'REJETCED'
}

export type Activity = {
  __typename?: 'Activity';
  id: Scalars['Int'];
  uuid: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  activityTypeId: Scalars['Int'];
  transportationTypeId: Scalars['Int'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  location: Scalars['String'];
  date: Scalars['DateTime'];
  timezone: Scalars['String'];
  public: Scalars['Boolean'];
  maxPeople: Scalars['Int'];
  activityType: ActivityType;
  transportationType: TransportationType;
  users: Array<User>;
};

export type TokenValidationResponse = {
  __typename?: 'TokenValidationResponse';
  token: Scalars['String'];
  hasAccount: Scalars['Boolean'];
};

export type Notification = {
  __typename?: 'Notification';
  id: Scalars['Int'];
  uuid: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  receiverUserId: Scalars['Int'];
  senderUserId: Scalars['Int'];
  resourceId: Scalars['Int'];
  type: NotificationType;
  read: Scalars['Boolean'];
  sender?: Maybe<User>;
  activity?: Maybe<Activity>;
  trip?: Maybe<Trip>;
};

/** Type of the notification */
export enum NotificationType {
  ActivityInvitationSent = 'ACTIVITY_INVITATION_SENT',
  ActivityJoinRequest = 'ACTIVITY_JOIN_REQUEST',
  UpcomingTrip = 'UPCOMING_TRIP',
  UpcomingActivity = 'UPCOMING_ACTIVITY'
}

export type Mutation = {
  __typename?: 'Mutation';
  addActivityType: ActivityType;
  addTransportationType: TransportationType;
  /** Only add to Favorite if the Trip is publicly available. If current user is the creator of the Trip then its always allowed */
  addFavorite: Favorite;
  deleteFavorite: Favorite;
  editSubPreparationStatus: SubPreparation;
  deleteSubPreparation: SubPreparation;
  deletePreparation: Preparation;
  addTrip: Trip;
  editTrip: Trip;
  deleteTrip: Trip;
  signIn: User;
  signOut: Scalars['Boolean'];
  signUp: User;
  editUser: User;
  editPassword: User;
  forgottenPassword: Scalars['String'];
  changeForgottenPassword: Scalars['Boolean'];
  deleteUser: User;
  addInvitations: Array<Invitation>;
  /** Link a user to an activity */
  addUserToActivity: Scalars['Boolean'];
  deleteActivity: Activity;
  /** Set current user's notification as read */
  setNotificationAsRead: Notification;
  /** Set all current user's notifications as read */
  setAllNotificationAsRead: UpdateManyResponse;
};


export type MutationAddActivityTypeArgs = {
  data: AddActivityTypeInput;
};


export type MutationAddTransportationTypeArgs = {
  data: AddTransportationTypeInput;
};


export type MutationAddFavoriteArgs = {
  tripId: Scalars['Int'];
};


export type MutationDeleteFavoriteArgs = {
  tripId: Scalars['Int'];
};


export type MutationEditSubPreparationStatusArgs = {
  subPreparationId: Scalars['Int'];
};


export type MutationDeleteSubPreparationArgs = {
  subPreparationId: Scalars['Int'];
};


export type MutationDeletePreparationArgs = {
  preparationId: Scalars['Int'];
};


export type MutationAddTripArgs = {
  data: AddTripInput;
};


export type MutationEditTripArgs = {
  data: AddTripInput;
  tripId: Scalars['Int'];
};


export type MutationDeleteTripArgs = {
  tripId: Scalars['Int'];
};


export type MutationSignInArgs = {
  data: SignInInput;
};


export type MutationSignUpArgs = {
  data: AddUserInput;
};


export type MutationEditUserArgs = {
  data: EditUserInput;
};


export type MutationEditPasswordArgs = {
  password: Scalars['String'];
};


export type MutationForgottenPasswordArgs = {
  email: Scalars['String'];
};


export type MutationChangeForgottenPasswordArgs = {
  data: ChangeForgottenPasswordInput;
};


export type MutationDeleteUserArgs = {
  userId: Scalars['Int'];
};


export type MutationAddInvitationsArgs = {
  data: AddInvitationInput;
};


export type MutationAddUserToActivityArgs = {
  activityId: Scalars['Float'];
};


export type MutationDeleteActivityArgs = {
  activityId: Scalars['Int'];
};


export type MutationSetNotificationAsReadArgs = {
  notificationId: Scalars['Int'];
};

export type AddActivityTypeInput = {
  name: Scalars['String'];
  type: Scalars['String'];
};

export type AddTransportationTypeInput = {
  name: Scalars['String'];
  type: Scalars['String'];
};

export type Favorite = {
  __typename?: 'Favorite';
  id: Scalars['Int'];
  uuid: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['Int'];
  tripId: Scalars['Int'];
  user?: Maybe<User>;
  trip?: Maybe<Trip>;
};

export type AddTripInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  public: Scalars['Boolean'];
  dateFrom: Scalars['DateTime'];
  dateTo: Scalars['DateTime'];
  adults: Scalars['Int'];
  children?: Maybe<Scalars['Int']>;
  infants?: Maybe<Scalars['Int']>;
  backgroundUrl?: Maybe<Scalars['String']>;
  locations: Array<AddLocationInput>;
  activities?: Maybe<Array<AddActivityInput>>;
  preparations?: Maybe<Array<AddPreparationInput>>;
};

export type AddLocationInput = {
  name: Scalars['String'];
};

export type AddActivityInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  location: Scalars['String'];
  date: Scalars['DateTime'];
  timezone: Scalars['String'];
  public: Scalars['Boolean'];
  maxPeople?: Maybe<Scalars['Int']>;
  activityTypeId: Scalars['Int'];
  transportationTypeId: Scalars['Int'];
};

export type AddPreparationInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  subPreparations: Array<AddSubPreparationInput>;
};

export type AddSubPreparationInput = {
  name: Scalars['String'];
  status?: Maybe<Scalars['Boolean']>;
};

export type SignInInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type AddUserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  confirmPassword: Scalars['String'];
  status?: Maybe<Scalars['Boolean']>;
  locked?: Maybe<Scalars['Boolean']>;
  invitationToken?: Maybe<Scalars['String']>;
  role?: Maybe<Role>;
};

export type EditUserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type ChangeForgottenPasswordInput = {
  token: Scalars['String'];
  password: Scalars['String'];
  confirmPassword: Scalars['String'];
};

export type AddInvitationInput = {
  activityId: Scalars['Int'];
  emails: Array<Scalars['String']>;
};

export type UpdateManyResponse = {
  __typename?: 'UpdateManyResponse';
  count: Scalars['Int'];
};

export type ActivityFragment = (
  { __typename?: 'Activity' }
  & Pick<Activity, 'id' | 'uuid' | 'name' | 'description' | 'location' | 'date' | 'timezone' | 'public' | 'maxPeople'>
  & { activityType: (
    { __typename?: 'ActivityType' }
    & ActivityTypeFragment
  ), transportationType: (
    { __typename?: 'TransportationType' }
    & TransportationTypeFragment
  ), users: Array<(
    { __typename?: 'User' }
    & Pick<User, 'name'>
  )> }
);

export type DeleteActivityMutationVariables = Exact<{
  activityId: Scalars['Int'];
}>;


export type DeleteActivityMutation = (
  { __typename?: 'Mutation' }
  & { deleteActivity: (
    { __typename?: 'Activity' }
    & ActivityFragment
  ) }
);

export type TripActivitiesQueryVariables = Exact<{
  tripId: Scalars['Int'];
  isCreator?: Maybe<Scalars['Boolean']>;
}>;


export type TripActivitiesQuery = (
  { __typename?: 'Query' }
  & { tripActivities: Array<(
    { __typename?: 'Activity' }
    & ActivityFragment
  )> }
);

export type ActivityTypeFragment = (
  { __typename?: 'ActivityType' }
  & Pick<ActivityType, 'id' | 'name' | 'type'>
);

export type ActivityTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type ActivityTypesQuery = (
  { __typename?: 'Query' }
  & { activityTypes: Array<(
    { __typename?: 'ActivityType' }
    & Pick<ActivityType, 'name' | 'type' | 'id'>
  )> }
);

export type AddFavoriteMutationVariables = Exact<{
  tripId: Scalars['Int'];
}>;


export type AddFavoriteMutation = (
  { __typename?: 'Mutation' }
  & { addFavorite: (
    { __typename?: 'Favorite' }
    & Pick<Favorite, 'id' | 'uuid' | 'userId' | 'tripId' | 'createdAt' | 'updatedAt'>
  ) }
);

export type DeleteFavoriteMutationVariables = Exact<{
  tripId: Scalars['Int'];
}>;


export type DeleteFavoriteMutation = (
  { __typename?: 'Mutation' }
  & { deleteFavorite: (
    { __typename?: 'Favorite' }
    & Pick<Favorite, 'id' | 'uuid' | 'userId' | 'tripId' | 'createdAt' | 'updatedAt'>
  ) }
);

export type MyFavoritesQueryVariables = Exact<{
  where?: Maybe<TripWhereInput>;
  pagination: PaginationInput;
  orderBy?: Maybe<TripSortByInput>;
}>;


export type MyFavoritesQuery = (
  { __typename?: 'Query' }
  & { myFavorites: (
    { __typename?: 'TripsResponse' }
    & Pick<TripsResponse, 'totalCount'>
    & { trips: Array<(
      { __typename?: 'Trip' }
      & TripFragment
    )> }
  ) }
);

export type AddInvitationsMutationVariables = Exact<{
  data: AddInvitationInput;
}>;


export type AddInvitationsMutation = (
  { __typename?: 'Mutation' }
  & { addInvitations: Array<(
    { __typename?: 'Invitation' }
    & Pick<Invitation, 'expiresAt' | 'email'>
  )> }
);

export type ValidateTokenQueryVariables = Exact<{
  token: Scalars['String'];
}>;


export type ValidateTokenQuery = (
  { __typename?: 'Query' }
  & { validateInvitationToken: (
    { __typename?: 'TokenValidationResponse' }
    & Pick<TokenValidationResponse, 'token' | 'hasAccount'>
  ) }
);

export type EmailAddressByInvitationTokenQueryVariables = Exact<{
  token: Scalars['String'];
}>;


export type EmailAddressByInvitationTokenQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'getEmailAddressByInvitationToken'>
);

export type ReceivedInvitationsQueryVariables = Exact<{ [key: string]: never; }>;


export type ReceivedInvitationsQuery = (
  { __typename?: 'Query' }
  & { receivedInvitations: Array<(
    { __typename?: 'Invitation' }
    & Pick<Invitation, 'id' | 'uuid' | 'createdAt' | 'email' | 'status' | 'expiresAt'>
    & { activity?: Maybe<(
      { __typename?: 'Activity' }
      & ActivityFragment
    )> }
  )> }
);

export type LocationFragment = (
  { __typename?: 'Location' }
  & Pick<Location, 'id' | 'uuid' | 'tripId' | 'name'>
);

export type HeaderNotificationFragment = (
  { __typename?: 'Notification' }
  & Pick<Notification, 'id' | 'uuid' | 'type' | 'read' | 'createdAt'>
  & { sender?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'name'>
  )> }
);

export type NotificationFragment = (
  { __typename?: 'Notification' }
  & Pick<Notification, 'id' | 'type' | 'read' | 'createdAt'>
  & { sender?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'name'>
  )>, activity?: Maybe<(
    { __typename?: 'Activity' }
    & ActivityFragment
  )>, trip?: Maybe<(
    { __typename?: 'Trip' }
    & TripFragment
  )> }
);

export type MarkAllHeaderNotificationsAsReadMutationVariables = Exact<{ [key: string]: never; }>;


export type MarkAllHeaderNotificationsAsReadMutation = (
  { __typename?: 'Mutation' }
  & { setAllNotificationAsRead: (
    { __typename?: 'UpdateManyResponse' }
    & Pick<UpdateManyResponse, 'count'>
  ) }
);

export type MarkHeaderNotificationAsReadMutationVariables = Exact<{
  notificationId: Scalars['Int'];
}>;


export type MarkHeaderNotificationAsReadMutation = (
  { __typename?: 'Mutation' }
  & { setNotificationAsRead: (
    { __typename?: 'Notification' }
    & HeaderNotificationFragment
  ) }
);

export type HeaderNotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type HeaderNotificationsQuery = (
  { __typename?: 'Query' }
  & { headerNotifications: Array<(
    { __typename?: 'Notification' }
    & HeaderNotificationFragment
  )> }
);

export type PreparationFragment = (
  { __typename?: 'Preparation' }
  & Pick<Preparation, 'id' | 'uuid' | 'name' | 'description'>
  & { subPreparations: Array<(
    { __typename?: 'SubPreparation' }
    & SubPreparationFragment
  )> }
);

export type DeletePreparationMutationVariables = Exact<{
  preparationId: Scalars['Int'];
}>;


export type DeletePreparationMutation = (
  { __typename?: 'Mutation' }
  & { deletePreparation: (
    { __typename?: 'Preparation' }
    & PreparationFragment
  ) }
);

export type SubPreparationFragment = (
  { __typename?: 'SubPreparation' }
  & Pick<SubPreparation, 'id' | 'uuid' | 'name' | 'status'>
);

export type EditSubPreparationStatusMutationVariables = Exact<{
  subPreparationId: Scalars['Int'];
}>;


export type EditSubPreparationStatusMutation = (
  { __typename?: 'Mutation' }
  & { editSubPreparationStatus: (
    { __typename?: 'SubPreparation' }
    & SubPreparationFragment
  ) }
);

export type DeleteSubPreparationMutationVariables = Exact<{
  subPreparationId: Scalars['Int'];
}>;


export type DeleteSubPreparationMutation = (
  { __typename?: 'Mutation' }
  & { deleteSubPreparation: (
    { __typename?: 'SubPreparation' }
    & SubPreparationFragment
  ) }
);

export type TransportationTypeFragment = (
  { __typename?: 'TransportationType' }
  & Pick<TransportationType, 'id' | 'name' | 'type'>
);

export type TransportationTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type TransportationTypesQuery = (
  { __typename?: 'Query' }
  & { transportationTypes: Array<(
    { __typename?: 'TransportationType' }
    & Pick<TransportationType, 'name' | 'type' | 'id'>
  )> }
);

export type TripFragment = (
  { __typename?: 'Trip' }
  & Pick<Trip, 'id' | 'uuid' | 'userId' | 'name' | 'description' | 'public' | 'dateFrom' | 'dateTo' | 'adults' | 'children' | 'infants' | 'backgroundUrl' | 'createdAt' | 'updatedAt' | 'isInFavorite'>
  & { locations: Array<(
    { __typename?: 'Location' }
    & LocationFragment
  )>, preparations: Array<(
    { __typename?: 'Preparation' }
    & PreparationFragment
  )> }
);

export type DeleteTripMutationVariables = Exact<{
  tripId: Scalars['Int'];
}>;


export type DeleteTripMutation = (
  { __typename?: 'Mutation' }
  & { deleteTrip: (
    { __typename?: 'Trip' }
    & TripFragment
  ) }
);

export type MyTripsQueryVariables = Exact<{
  where?: Maybe<TripWhereInput>;
  pagination: PaginationInput;
  orderBy?: Maybe<TripSortByInput>;
}>;


export type MyTripsQuery = (
  { __typename?: 'Query' }
  & { myTrips: (
    { __typename?: 'TripsResponse' }
    & Pick<TripsResponse, 'totalCount'>
    & { trips: Array<(
      { __typename?: 'Trip' }
      & TripFragment
    )> }
  ) }
);

export type TripQueryVariables = Exact<{
  tripId: Scalars['Int'];
}>;


export type TripQuery = (
  { __typename?: 'Query' }
  & { trip?: Maybe<(
    { __typename?: 'Trip' }
    & TripFragment
  )> }
);

export type MyUpcomingTripQueryVariables = Exact<{ [key: string]: never; }>;


export type MyUpcomingTripQuery = (
  { __typename?: 'Query' }
  & { myUpcomingTrip?: Maybe<(
    { __typename?: 'Trip' }
    & TripFragment
  )> }
);

export type MeFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'email' | 'name' | 'role'>
);

export type SignInMutationVariables = Exact<{
  data: SignInInput;
}>;


export type SignInMutation = (
  { __typename?: 'Mutation' }
  & { signIn: (
    { __typename?: 'User' }
    & MeFragment
  ) }
);

export type SignUpMutationVariables = Exact<{
  data: AddUserInput;
}>;


export type SignUpMutation = (
  { __typename?: 'Mutation' }
  & { signUp: (
    { __typename?: 'User' }
    & MeFragment
  ) }
);

export type SignOutMutationVariables = Exact<{ [key: string]: never; }>;


export type SignOutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'signOut'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & MeFragment
  )> }
);

export const HeaderNotificationFragmentDoc = gql`
    fragment HeaderNotification on Notification {
  id
  uuid
  type
  read
  sender {
    name
  }
  createdAt
}
    `;
export const ActivityTypeFragmentDoc = gql`
    fragment ActivityType on ActivityType {
  id
  name
  type
}
    `;
export const TransportationTypeFragmentDoc = gql`
    fragment TransportationType on TransportationType {
  id
  name
  type
}
    `;
export const ActivityFragmentDoc = gql`
    fragment Activity on Activity {
  id
  uuid
  name
  description
  location
  date
  timezone
  public
  maxPeople
  activityType {
    ...ActivityType
  }
  transportationType {
    ...TransportationType
  }
  users {
    name
  }
}
    ${ActivityTypeFragmentDoc}
${TransportationTypeFragmentDoc}`;
export const LocationFragmentDoc = gql`
    fragment Location on Location {
  id
  uuid
  tripId
  name
}
    `;
export const SubPreparationFragmentDoc = gql`
    fragment SubPreparation on SubPreparation {
  id
  uuid
  name
  status
}
    `;
export const PreparationFragmentDoc = gql`
    fragment Preparation on Preparation {
  id
  uuid
  name
  description
  subPreparations {
    ...SubPreparation
  }
}
    ${SubPreparationFragmentDoc}`;
export const TripFragmentDoc = gql`
    fragment Trip on Trip {
  id
  uuid
  userId
  name
  description
  public
  dateFrom
  dateTo
  adults
  children
  infants
  backgroundUrl
  createdAt
  updatedAt
  isInFavorite
  locations {
    ...Location
  }
  preparations {
    ...Preparation
  }
}
    ${LocationFragmentDoc}
${PreparationFragmentDoc}`;
export const NotificationFragmentDoc = gql`
    fragment Notification on Notification {
  id
  type
  read
  sender {
    name
  }
  activity {
    ...Activity
  }
  trip {
    ...Trip
  }
  createdAt
}
    ${ActivityFragmentDoc}
${TripFragmentDoc}`;
export const MeFragmentDoc = gql`
    fragment Me on User {
  id
  email
  name
  role
}
    `;
export const DeleteActivityDocument = gql`
    mutation DeleteActivity($activityId: Int!) {
  deleteActivity(activityId: $activityId) {
    ...Activity
  }
}
    ${ActivityFragmentDoc}`;
export type DeleteActivityMutationFn = Apollo.MutationFunction<DeleteActivityMutation, DeleteActivityMutationVariables>;

/**
 * __useDeleteActivityMutation__
 *
 * To run a mutation, you first call `useDeleteActivityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteActivityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteActivityMutation, { data, loading, error }] = useDeleteActivityMutation({
 *   variables: {
 *      activityId: // value for 'activityId'
 *   },
 * });
 */
export function useDeleteActivityMutation(baseOptions?: Apollo.MutationHookOptions<DeleteActivityMutation, DeleteActivityMutationVariables>) {
        return Apollo.useMutation<DeleteActivityMutation, DeleteActivityMutationVariables>(DeleteActivityDocument, baseOptions);
      }
export type DeleteActivityMutationHookResult = ReturnType<typeof useDeleteActivityMutation>;
export type DeleteActivityMutationResult = Apollo.MutationResult<DeleteActivityMutation>;
export type DeleteActivityMutationOptions = Apollo.BaseMutationOptions<DeleteActivityMutation, DeleteActivityMutationVariables>;
export const TripActivitiesDocument = gql`
    query TripActivities($tripId: Int!, $isCreator: Boolean) {
  tripActivities(tripId: $tripId, isCreator: $isCreator) {
    ...Activity
  }
}
    ${ActivityFragmentDoc}`;

/**
 * __useTripActivitiesQuery__
 *
 * To run a query within a React component, call `useTripActivitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useTripActivitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTripActivitiesQuery({
 *   variables: {
 *      tripId: // value for 'tripId'
 *      isCreator: // value for 'isCreator'
 *   },
 * });
 */
export function useTripActivitiesQuery(baseOptions: Apollo.QueryHookOptions<TripActivitiesQuery, TripActivitiesQueryVariables>) {
        return Apollo.useQuery<TripActivitiesQuery, TripActivitiesQueryVariables>(TripActivitiesDocument, baseOptions);
      }
export function useTripActivitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TripActivitiesQuery, TripActivitiesQueryVariables>) {
          return Apollo.useLazyQuery<TripActivitiesQuery, TripActivitiesQueryVariables>(TripActivitiesDocument, baseOptions);
        }
export type TripActivitiesQueryHookResult = ReturnType<typeof useTripActivitiesQuery>;
export type TripActivitiesLazyQueryHookResult = ReturnType<typeof useTripActivitiesLazyQuery>;
export type TripActivitiesQueryResult = Apollo.QueryResult<TripActivitiesQuery, TripActivitiesQueryVariables>;
export const ActivityTypesDocument = gql`
    query ActivityTypes {
  activityTypes {
    name
    type
    id
  }
}
    `;

/**
 * __useActivityTypesQuery__
 *
 * To run a query within a React component, call `useActivityTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useActivityTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useActivityTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function useActivityTypesQuery(baseOptions?: Apollo.QueryHookOptions<ActivityTypesQuery, ActivityTypesQueryVariables>) {
        return Apollo.useQuery<ActivityTypesQuery, ActivityTypesQueryVariables>(ActivityTypesDocument, baseOptions);
      }
export function useActivityTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ActivityTypesQuery, ActivityTypesQueryVariables>) {
          return Apollo.useLazyQuery<ActivityTypesQuery, ActivityTypesQueryVariables>(ActivityTypesDocument, baseOptions);
        }
export type ActivityTypesQueryHookResult = ReturnType<typeof useActivityTypesQuery>;
export type ActivityTypesLazyQueryHookResult = ReturnType<typeof useActivityTypesLazyQuery>;
export type ActivityTypesQueryResult = Apollo.QueryResult<ActivityTypesQuery, ActivityTypesQueryVariables>;
export const AddFavoriteDocument = gql`
    mutation AddFavorite($tripId: Int!) {
  addFavorite(tripId: $tripId) {
    id
    uuid
    userId
    tripId
    createdAt
    updatedAt
  }
}
    `;
export type AddFavoriteMutationFn = Apollo.MutationFunction<AddFavoriteMutation, AddFavoriteMutationVariables>;

/**
 * __useAddFavoriteMutation__
 *
 * To run a mutation, you first call `useAddFavoriteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddFavoriteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addFavoriteMutation, { data, loading, error }] = useAddFavoriteMutation({
 *   variables: {
 *      tripId: // value for 'tripId'
 *   },
 * });
 */
export function useAddFavoriteMutation(baseOptions?: Apollo.MutationHookOptions<AddFavoriteMutation, AddFavoriteMutationVariables>) {
        return Apollo.useMutation<AddFavoriteMutation, AddFavoriteMutationVariables>(AddFavoriteDocument, baseOptions);
      }
export type AddFavoriteMutationHookResult = ReturnType<typeof useAddFavoriteMutation>;
export type AddFavoriteMutationResult = Apollo.MutationResult<AddFavoriteMutation>;
export type AddFavoriteMutationOptions = Apollo.BaseMutationOptions<AddFavoriteMutation, AddFavoriteMutationVariables>;
export const DeleteFavoriteDocument = gql`
    mutation DeleteFavorite($tripId: Int!) {
  deleteFavorite(tripId: $tripId) {
    id
    uuid
    userId
    tripId
    createdAt
    updatedAt
  }
}
    `;
export type DeleteFavoriteMutationFn = Apollo.MutationFunction<DeleteFavoriteMutation, DeleteFavoriteMutationVariables>;

/**
 * __useDeleteFavoriteMutation__
 *
 * To run a mutation, you first call `useDeleteFavoriteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFavoriteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFavoriteMutation, { data, loading, error }] = useDeleteFavoriteMutation({
 *   variables: {
 *      tripId: // value for 'tripId'
 *   },
 * });
 */
export function useDeleteFavoriteMutation(baseOptions?: Apollo.MutationHookOptions<DeleteFavoriteMutation, DeleteFavoriteMutationVariables>) {
        return Apollo.useMutation<DeleteFavoriteMutation, DeleteFavoriteMutationVariables>(DeleteFavoriteDocument, baseOptions);
      }
export type DeleteFavoriteMutationHookResult = ReturnType<typeof useDeleteFavoriteMutation>;
export type DeleteFavoriteMutationResult = Apollo.MutationResult<DeleteFavoriteMutation>;
export type DeleteFavoriteMutationOptions = Apollo.BaseMutationOptions<DeleteFavoriteMutation, DeleteFavoriteMutationVariables>;
export const MyFavoritesDocument = gql`
    query MyFavorites($where: TripWhereInput, $pagination: PaginationInput!, $orderBy: TripSortByInput) {
  myFavorites(where: $where, pagination: $pagination, orderBy: $orderBy) {
    trips {
      ...Trip
    }
    totalCount
  }
}
    ${TripFragmentDoc}`;

/**
 * __useMyFavoritesQuery__
 *
 * To run a query within a React component, call `useMyFavoritesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyFavoritesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyFavoritesQuery({
 *   variables: {
 *      where: // value for 'where'
 *      pagination: // value for 'pagination'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useMyFavoritesQuery(baseOptions: Apollo.QueryHookOptions<MyFavoritesQuery, MyFavoritesQueryVariables>) {
        return Apollo.useQuery<MyFavoritesQuery, MyFavoritesQueryVariables>(MyFavoritesDocument, baseOptions);
      }
export function useMyFavoritesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyFavoritesQuery, MyFavoritesQueryVariables>) {
          return Apollo.useLazyQuery<MyFavoritesQuery, MyFavoritesQueryVariables>(MyFavoritesDocument, baseOptions);
        }
export type MyFavoritesQueryHookResult = ReturnType<typeof useMyFavoritesQuery>;
export type MyFavoritesLazyQueryHookResult = ReturnType<typeof useMyFavoritesLazyQuery>;
export type MyFavoritesQueryResult = Apollo.QueryResult<MyFavoritesQuery, MyFavoritesQueryVariables>;
export const AddInvitationsDocument = gql`
    mutation AddInvitations($data: AddInvitationInput!) {
  addInvitations(data: $data) {
    expiresAt
    email
  }
}
    `;
export type AddInvitationsMutationFn = Apollo.MutationFunction<AddInvitationsMutation, AddInvitationsMutationVariables>;

/**
 * __useAddInvitationsMutation__
 *
 * To run a mutation, you first call `useAddInvitationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddInvitationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addInvitationsMutation, { data, loading, error }] = useAddInvitationsMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddInvitationsMutation(baseOptions?: Apollo.MutationHookOptions<AddInvitationsMutation, AddInvitationsMutationVariables>) {
        return Apollo.useMutation<AddInvitationsMutation, AddInvitationsMutationVariables>(AddInvitationsDocument, baseOptions);
      }
export type AddInvitationsMutationHookResult = ReturnType<typeof useAddInvitationsMutation>;
export type AddInvitationsMutationResult = Apollo.MutationResult<AddInvitationsMutation>;
export type AddInvitationsMutationOptions = Apollo.BaseMutationOptions<AddInvitationsMutation, AddInvitationsMutationVariables>;
export const ValidateTokenDocument = gql`
    query ValidateToken($token: String!) {
  validateInvitationToken(token: $token) {
    token
    hasAccount
  }
}
    `;

/**
 * __useValidateTokenQuery__
 *
 * To run a query within a React component, call `useValidateTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useValidateTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useValidateTokenQuery({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useValidateTokenQuery(baseOptions: Apollo.QueryHookOptions<ValidateTokenQuery, ValidateTokenQueryVariables>) {
        return Apollo.useQuery<ValidateTokenQuery, ValidateTokenQueryVariables>(ValidateTokenDocument, baseOptions);
      }
export function useValidateTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ValidateTokenQuery, ValidateTokenQueryVariables>) {
          return Apollo.useLazyQuery<ValidateTokenQuery, ValidateTokenQueryVariables>(ValidateTokenDocument, baseOptions);
        }
export type ValidateTokenQueryHookResult = ReturnType<typeof useValidateTokenQuery>;
export type ValidateTokenLazyQueryHookResult = ReturnType<typeof useValidateTokenLazyQuery>;
export type ValidateTokenQueryResult = Apollo.QueryResult<ValidateTokenQuery, ValidateTokenQueryVariables>;
export const EmailAddressByInvitationTokenDocument = gql`
    query EmailAddressByInvitationToken($token: String!) {
  getEmailAddressByInvitationToken(token: $token)
}
    `;

/**
 * __useEmailAddressByInvitationTokenQuery__
 *
 * To run a query within a React component, call `useEmailAddressByInvitationTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useEmailAddressByInvitationTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEmailAddressByInvitationTokenQuery({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useEmailAddressByInvitationTokenQuery(baseOptions: Apollo.QueryHookOptions<EmailAddressByInvitationTokenQuery, EmailAddressByInvitationTokenQueryVariables>) {
        return Apollo.useQuery<EmailAddressByInvitationTokenQuery, EmailAddressByInvitationTokenQueryVariables>(EmailAddressByInvitationTokenDocument, baseOptions);
      }
export function useEmailAddressByInvitationTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EmailAddressByInvitationTokenQuery, EmailAddressByInvitationTokenQueryVariables>) {
          return Apollo.useLazyQuery<EmailAddressByInvitationTokenQuery, EmailAddressByInvitationTokenQueryVariables>(EmailAddressByInvitationTokenDocument, baseOptions);
        }
export type EmailAddressByInvitationTokenQueryHookResult = ReturnType<typeof useEmailAddressByInvitationTokenQuery>;
export type EmailAddressByInvitationTokenLazyQueryHookResult = ReturnType<typeof useEmailAddressByInvitationTokenLazyQuery>;
export type EmailAddressByInvitationTokenQueryResult = Apollo.QueryResult<EmailAddressByInvitationTokenQuery, EmailAddressByInvitationTokenQueryVariables>;
export const ReceivedInvitationsDocument = gql`
    query ReceivedInvitations {
  receivedInvitations {
    id
    uuid
    createdAt
    email
    status
    expiresAt
    activity {
      ...Activity
    }
  }
}
    ${ActivityFragmentDoc}`;

/**
 * __useReceivedInvitationsQuery__
 *
 * To run a query within a React component, call `useReceivedInvitationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useReceivedInvitationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReceivedInvitationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useReceivedInvitationsQuery(baseOptions?: Apollo.QueryHookOptions<ReceivedInvitationsQuery, ReceivedInvitationsQueryVariables>) {
        return Apollo.useQuery<ReceivedInvitationsQuery, ReceivedInvitationsQueryVariables>(ReceivedInvitationsDocument, baseOptions);
      }
export function useReceivedInvitationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReceivedInvitationsQuery, ReceivedInvitationsQueryVariables>) {
          return Apollo.useLazyQuery<ReceivedInvitationsQuery, ReceivedInvitationsQueryVariables>(ReceivedInvitationsDocument, baseOptions);
        }
export type ReceivedInvitationsQueryHookResult = ReturnType<typeof useReceivedInvitationsQuery>;
export type ReceivedInvitationsLazyQueryHookResult = ReturnType<typeof useReceivedInvitationsLazyQuery>;
export type ReceivedInvitationsQueryResult = Apollo.QueryResult<ReceivedInvitationsQuery, ReceivedInvitationsQueryVariables>;
export const MarkAllHeaderNotificationsAsReadDocument = gql`
    mutation MarkAllHeaderNotificationsAsRead {
  setAllNotificationAsRead {
    count
  }
}
    `;
export type MarkAllHeaderNotificationsAsReadMutationFn = Apollo.MutationFunction<MarkAllHeaderNotificationsAsReadMutation, MarkAllHeaderNotificationsAsReadMutationVariables>;

/**
 * __useMarkAllHeaderNotificationsAsReadMutation__
 *
 * To run a mutation, you first call `useMarkAllHeaderNotificationsAsReadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkAllHeaderNotificationsAsReadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markAllHeaderNotificationsAsReadMutation, { data, loading, error }] = useMarkAllHeaderNotificationsAsReadMutation({
 *   variables: {
 *   },
 * });
 */
export function useMarkAllHeaderNotificationsAsReadMutation(baseOptions?: Apollo.MutationHookOptions<MarkAllHeaderNotificationsAsReadMutation, MarkAllHeaderNotificationsAsReadMutationVariables>) {
        return Apollo.useMutation<MarkAllHeaderNotificationsAsReadMutation, MarkAllHeaderNotificationsAsReadMutationVariables>(MarkAllHeaderNotificationsAsReadDocument, baseOptions);
      }
export type MarkAllHeaderNotificationsAsReadMutationHookResult = ReturnType<typeof useMarkAllHeaderNotificationsAsReadMutation>;
export type MarkAllHeaderNotificationsAsReadMutationResult = Apollo.MutationResult<MarkAllHeaderNotificationsAsReadMutation>;
export type MarkAllHeaderNotificationsAsReadMutationOptions = Apollo.BaseMutationOptions<MarkAllHeaderNotificationsAsReadMutation, MarkAllHeaderNotificationsAsReadMutationVariables>;
export const MarkHeaderNotificationAsReadDocument = gql`
    mutation MarkHeaderNotificationAsRead($notificationId: Int!) {
  setNotificationAsRead(notificationId: $notificationId) {
    ...HeaderNotification
  }
}
    ${HeaderNotificationFragmentDoc}`;
export type MarkHeaderNotificationAsReadMutationFn = Apollo.MutationFunction<MarkHeaderNotificationAsReadMutation, MarkHeaderNotificationAsReadMutationVariables>;

/**
 * __useMarkHeaderNotificationAsReadMutation__
 *
 * To run a mutation, you first call `useMarkHeaderNotificationAsReadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkHeaderNotificationAsReadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markHeaderNotificationAsReadMutation, { data, loading, error }] = useMarkHeaderNotificationAsReadMutation({
 *   variables: {
 *      notificationId: // value for 'notificationId'
 *   },
 * });
 */
export function useMarkHeaderNotificationAsReadMutation(baseOptions?: Apollo.MutationHookOptions<MarkHeaderNotificationAsReadMutation, MarkHeaderNotificationAsReadMutationVariables>) {
        return Apollo.useMutation<MarkHeaderNotificationAsReadMutation, MarkHeaderNotificationAsReadMutationVariables>(MarkHeaderNotificationAsReadDocument, baseOptions);
      }
export type MarkHeaderNotificationAsReadMutationHookResult = ReturnType<typeof useMarkHeaderNotificationAsReadMutation>;
export type MarkHeaderNotificationAsReadMutationResult = Apollo.MutationResult<MarkHeaderNotificationAsReadMutation>;
export type MarkHeaderNotificationAsReadMutationOptions = Apollo.BaseMutationOptions<MarkHeaderNotificationAsReadMutation, MarkHeaderNotificationAsReadMutationVariables>;
export const HeaderNotificationsDocument = gql`
    query HeaderNotifications {
  headerNotifications {
    ...HeaderNotification
  }
}
    ${HeaderNotificationFragmentDoc}`;

/**
 * __useHeaderNotificationsQuery__
 *
 * To run a query within a React component, call `useHeaderNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useHeaderNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHeaderNotificationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useHeaderNotificationsQuery(baseOptions?: Apollo.QueryHookOptions<HeaderNotificationsQuery, HeaderNotificationsQueryVariables>) {
        return Apollo.useQuery<HeaderNotificationsQuery, HeaderNotificationsQueryVariables>(HeaderNotificationsDocument, baseOptions);
      }
export function useHeaderNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HeaderNotificationsQuery, HeaderNotificationsQueryVariables>) {
          return Apollo.useLazyQuery<HeaderNotificationsQuery, HeaderNotificationsQueryVariables>(HeaderNotificationsDocument, baseOptions);
        }
export type HeaderNotificationsQueryHookResult = ReturnType<typeof useHeaderNotificationsQuery>;
export type HeaderNotificationsLazyQueryHookResult = ReturnType<typeof useHeaderNotificationsLazyQuery>;
export type HeaderNotificationsQueryResult = Apollo.QueryResult<HeaderNotificationsQuery, HeaderNotificationsQueryVariables>;
export const DeletePreparationDocument = gql`
    mutation DeletePreparation($preparationId: Int!) {
  deletePreparation(preparationId: $preparationId) {
    ...Preparation
  }
}
    ${PreparationFragmentDoc}`;
export type DeletePreparationMutationFn = Apollo.MutationFunction<DeletePreparationMutation, DeletePreparationMutationVariables>;

/**
 * __useDeletePreparationMutation__
 *
 * To run a mutation, you first call `useDeletePreparationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePreparationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePreparationMutation, { data, loading, error }] = useDeletePreparationMutation({
 *   variables: {
 *      preparationId: // value for 'preparationId'
 *   },
 * });
 */
export function useDeletePreparationMutation(baseOptions?: Apollo.MutationHookOptions<DeletePreparationMutation, DeletePreparationMutationVariables>) {
        return Apollo.useMutation<DeletePreparationMutation, DeletePreparationMutationVariables>(DeletePreparationDocument, baseOptions);
      }
export type DeletePreparationMutationHookResult = ReturnType<typeof useDeletePreparationMutation>;
export type DeletePreparationMutationResult = Apollo.MutationResult<DeletePreparationMutation>;
export type DeletePreparationMutationOptions = Apollo.BaseMutationOptions<DeletePreparationMutation, DeletePreparationMutationVariables>;
export const EditSubPreparationStatusDocument = gql`
    mutation EditSubPreparationStatus($subPreparationId: Int!) {
  editSubPreparationStatus(subPreparationId: $subPreparationId) {
    ...SubPreparation
  }
}
    ${SubPreparationFragmentDoc}`;
export type EditSubPreparationStatusMutationFn = Apollo.MutationFunction<EditSubPreparationStatusMutation, EditSubPreparationStatusMutationVariables>;

/**
 * __useEditSubPreparationStatusMutation__
 *
 * To run a mutation, you first call `useEditSubPreparationStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditSubPreparationStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editSubPreparationStatusMutation, { data, loading, error }] = useEditSubPreparationStatusMutation({
 *   variables: {
 *      subPreparationId: // value for 'subPreparationId'
 *   },
 * });
 */
export function useEditSubPreparationStatusMutation(baseOptions?: Apollo.MutationHookOptions<EditSubPreparationStatusMutation, EditSubPreparationStatusMutationVariables>) {
        return Apollo.useMutation<EditSubPreparationStatusMutation, EditSubPreparationStatusMutationVariables>(EditSubPreparationStatusDocument, baseOptions);
      }
export type EditSubPreparationStatusMutationHookResult = ReturnType<typeof useEditSubPreparationStatusMutation>;
export type EditSubPreparationStatusMutationResult = Apollo.MutationResult<EditSubPreparationStatusMutation>;
export type EditSubPreparationStatusMutationOptions = Apollo.BaseMutationOptions<EditSubPreparationStatusMutation, EditSubPreparationStatusMutationVariables>;
export const DeleteSubPreparationDocument = gql`
    mutation DeleteSubPreparation($subPreparationId: Int!) {
  deleteSubPreparation(subPreparationId: $subPreparationId) {
    ...SubPreparation
  }
}
    ${SubPreparationFragmentDoc}`;
export type DeleteSubPreparationMutationFn = Apollo.MutationFunction<DeleteSubPreparationMutation, DeleteSubPreparationMutationVariables>;

/**
 * __useDeleteSubPreparationMutation__
 *
 * To run a mutation, you first call `useDeleteSubPreparationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSubPreparationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSubPreparationMutation, { data, loading, error }] = useDeleteSubPreparationMutation({
 *   variables: {
 *      subPreparationId: // value for 'subPreparationId'
 *   },
 * });
 */
export function useDeleteSubPreparationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSubPreparationMutation, DeleteSubPreparationMutationVariables>) {
        return Apollo.useMutation<DeleteSubPreparationMutation, DeleteSubPreparationMutationVariables>(DeleteSubPreparationDocument, baseOptions);
      }
export type DeleteSubPreparationMutationHookResult = ReturnType<typeof useDeleteSubPreparationMutation>;
export type DeleteSubPreparationMutationResult = Apollo.MutationResult<DeleteSubPreparationMutation>;
export type DeleteSubPreparationMutationOptions = Apollo.BaseMutationOptions<DeleteSubPreparationMutation, DeleteSubPreparationMutationVariables>;
export const TransportationTypesDocument = gql`
    query TransportationTypes {
  transportationTypes {
    name
    type
    id
  }
}
    `;

/**
 * __useTransportationTypesQuery__
 *
 * To run a query within a React component, call `useTransportationTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransportationTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransportationTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function useTransportationTypesQuery(baseOptions?: Apollo.QueryHookOptions<TransportationTypesQuery, TransportationTypesQueryVariables>) {
        return Apollo.useQuery<TransportationTypesQuery, TransportationTypesQueryVariables>(TransportationTypesDocument, baseOptions);
      }
export function useTransportationTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TransportationTypesQuery, TransportationTypesQueryVariables>) {
          return Apollo.useLazyQuery<TransportationTypesQuery, TransportationTypesQueryVariables>(TransportationTypesDocument, baseOptions);
        }
export type TransportationTypesQueryHookResult = ReturnType<typeof useTransportationTypesQuery>;
export type TransportationTypesLazyQueryHookResult = ReturnType<typeof useTransportationTypesLazyQuery>;
export type TransportationTypesQueryResult = Apollo.QueryResult<TransportationTypesQuery, TransportationTypesQueryVariables>;
export const DeleteTripDocument = gql`
    mutation DeleteTrip($tripId: Int!) {
  deleteTrip(tripId: $tripId) {
    ...Trip
  }
}
    ${TripFragmentDoc}`;
export type DeleteTripMutationFn = Apollo.MutationFunction<DeleteTripMutation, DeleteTripMutationVariables>;

/**
 * __useDeleteTripMutation__
 *
 * To run a mutation, you first call `useDeleteTripMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTripMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTripMutation, { data, loading, error }] = useDeleteTripMutation({
 *   variables: {
 *      tripId: // value for 'tripId'
 *   },
 * });
 */
export function useDeleteTripMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTripMutation, DeleteTripMutationVariables>) {
        return Apollo.useMutation<DeleteTripMutation, DeleteTripMutationVariables>(DeleteTripDocument, baseOptions);
      }
export type DeleteTripMutationHookResult = ReturnType<typeof useDeleteTripMutation>;
export type DeleteTripMutationResult = Apollo.MutationResult<DeleteTripMutation>;
export type DeleteTripMutationOptions = Apollo.BaseMutationOptions<DeleteTripMutation, DeleteTripMutationVariables>;
export const MyTripsDocument = gql`
    query MyTrips($where: TripWhereInput, $pagination: PaginationInput!, $orderBy: TripSortByInput) {
  myTrips(where: $where, pagination: $pagination, orderBy: $orderBy) {
    trips {
      ...Trip
    }
    totalCount
  }
}
    ${TripFragmentDoc}`;

/**
 * __useMyTripsQuery__
 *
 * To run a query within a React component, call `useMyTripsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyTripsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyTripsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      pagination: // value for 'pagination'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useMyTripsQuery(baseOptions: Apollo.QueryHookOptions<MyTripsQuery, MyTripsQueryVariables>) {
        return Apollo.useQuery<MyTripsQuery, MyTripsQueryVariables>(MyTripsDocument, baseOptions);
      }
export function useMyTripsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyTripsQuery, MyTripsQueryVariables>) {
          return Apollo.useLazyQuery<MyTripsQuery, MyTripsQueryVariables>(MyTripsDocument, baseOptions);
        }
export type MyTripsQueryHookResult = ReturnType<typeof useMyTripsQuery>;
export type MyTripsLazyQueryHookResult = ReturnType<typeof useMyTripsLazyQuery>;
export type MyTripsQueryResult = Apollo.QueryResult<MyTripsQuery, MyTripsQueryVariables>;
export const TripDocument = gql`
    query Trip($tripId: Int!) {
  trip(tripId: $tripId) {
    ...Trip
  }
}
    ${TripFragmentDoc}`;

/**
 * __useTripQuery__
 *
 * To run a query within a React component, call `useTripQuery` and pass it any options that fit your needs.
 * When your component renders, `useTripQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTripQuery({
 *   variables: {
 *      tripId: // value for 'tripId'
 *   },
 * });
 */
export function useTripQuery(baseOptions: Apollo.QueryHookOptions<TripQuery, TripQueryVariables>) {
        return Apollo.useQuery<TripQuery, TripQueryVariables>(TripDocument, baseOptions);
      }
export function useTripLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TripQuery, TripQueryVariables>) {
          return Apollo.useLazyQuery<TripQuery, TripQueryVariables>(TripDocument, baseOptions);
        }
export type TripQueryHookResult = ReturnType<typeof useTripQuery>;
export type TripLazyQueryHookResult = ReturnType<typeof useTripLazyQuery>;
export type TripQueryResult = Apollo.QueryResult<TripQuery, TripQueryVariables>;
export const MyUpcomingTripDocument = gql`
    query MyUpcomingTrip {
  myUpcomingTrip {
    ...Trip
  }
}
    ${TripFragmentDoc}`;

/**
 * __useMyUpcomingTripQuery__
 *
 * To run a query within a React component, call `useMyUpcomingTripQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyUpcomingTripQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyUpcomingTripQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyUpcomingTripQuery(baseOptions?: Apollo.QueryHookOptions<MyUpcomingTripQuery, MyUpcomingTripQueryVariables>) {
        return Apollo.useQuery<MyUpcomingTripQuery, MyUpcomingTripQueryVariables>(MyUpcomingTripDocument, baseOptions);
      }
export function useMyUpcomingTripLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyUpcomingTripQuery, MyUpcomingTripQueryVariables>) {
          return Apollo.useLazyQuery<MyUpcomingTripQuery, MyUpcomingTripQueryVariables>(MyUpcomingTripDocument, baseOptions);
        }
export type MyUpcomingTripQueryHookResult = ReturnType<typeof useMyUpcomingTripQuery>;
export type MyUpcomingTripLazyQueryHookResult = ReturnType<typeof useMyUpcomingTripLazyQuery>;
export type MyUpcomingTripQueryResult = Apollo.QueryResult<MyUpcomingTripQuery, MyUpcomingTripQueryVariables>;
export const SignInDocument = gql`
    mutation SignIn($data: SignInInput!) {
  signIn(data: $data) {
    ...Me
  }
}
    ${MeFragmentDoc}`;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, baseOptions);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const SignUpDocument = gql`
    mutation SignUp($data: AddUserInput!) {
  signUp(data: $data) {
    ...Me
  }
}
    ${MeFragmentDoc}`;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, baseOptions);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const SignOutDocument = gql`
    mutation SignOut {
  signOut
}
    `;
export type SignOutMutationFn = Apollo.MutationFunction<SignOutMutation, SignOutMutationVariables>;

/**
 * __useSignOutMutation__
 *
 * To run a mutation, you first call `useSignOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signOutMutation, { data, loading, error }] = useSignOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useSignOutMutation(baseOptions?: Apollo.MutationHookOptions<SignOutMutation, SignOutMutationVariables>) {
        return Apollo.useMutation<SignOutMutation, SignOutMutationVariables>(SignOutDocument, baseOptions);
      }
export type SignOutMutationHookResult = ReturnType<typeof useSignOutMutation>;
export type SignOutMutationResult = Apollo.MutationResult<SignOutMutation>;
export type SignOutMutationOptions = Apollo.BaseMutationOptions<SignOutMutation, SignOutMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...Me
  }
}
    ${MeFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;