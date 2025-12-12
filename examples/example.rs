//! Rust Example
//! Demonstrates syntax highlighting

use std::collections::HashMap;
use std::error::Error;
use std::fmt;
use std::sync::{Arc, Mutex};

// Constants
const MAX_RETRIES: u32 = 3;
const PI: f64 = 3.14159;
const HEX_VALUE: u32 = 0xFF;

/// Custom error type
#[derive(Debug)]
pub enum AppError {
    NotFound(String),
    InvalidInput { field: String, message: String },
    Internal(Box<dyn Error + Send + Sync>),
}

impl fmt::Display for AppError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            AppError::NotFound(id) => write!(f, "Not found: {}", id),
            AppError::InvalidInput { field, message } => {
                write!(f, "Invalid {}: {}", field, message)
            }
            AppError::Internal(e) => write!(f, "Internal error: {}", e),
        }
    }
}

impl Error for AppError {}

/// User struct with derive macros
#[derive(Debug, Clone, PartialEq)]
pub struct User {
    pub id: u64,
    pub name: String,
    pub email: Option<String>,
    pub active: bool,
}

impl User {
    /// Creates a new User
    pub fn new(id: u64, name: impl Into<String>) -> Self {
        Self {
            id,
            name: name.into(),
            email: None,
            active: true,
        }
    }

    /// Sets the email
    pub fn with_email(mut self, email: impl Into<String>) -> Self {
        self.email = Some(email.into());
        self
    }
}

impl Default for User {
    fn default() -> Self {
        Self {
            id: 0,
            name: String::new(),
            email: None,
            active: false,
        }
    }
}

/// Generic repository trait
pub trait Repository<T> {
    fn find(&self, id: u64) -> Result<Option<T>, AppError>;
    fn save(&mut self, item: T) -> Result<(), AppError>;
    fn delete(&mut self, id: u64) -> Result<(), AppError>;
}

/// In-memory user repository
pub struct UserRepository {
    storage: Arc<Mutex<HashMap<u64, User>>>,
}

impl UserRepository {
    pub fn new() -> Self {
        Self {
            storage: Arc::new(Mutex::new(HashMap::new())),
        }
    }
}

impl Repository<User> for UserRepository {
    fn find(&self, id: u64) -> Result<Option<User>, AppError> {
        let storage = self.storage.lock().map_err(|e| {
            AppError::Internal(e.to_string().into())
        })?;
        Ok(storage.get(&id).cloned())
    }

    fn save(&mut self, item: User) -> Result<(), AppError> {
        let mut storage = self.storage.lock().map_err(|e| {
            AppError::Internal(e.to_string().into())
        })?;
        storage.insert(item.id, item);
        Ok(())
    }

    fn delete(&mut self, id: u64) -> Result<(), AppError> {
        let mut storage = self.storage.lock().map_err(|e| {
            AppError::Internal(e.to_string().into())
        })?;
        storage.remove(&id);
        Ok(())
    }
}

/// Fibonacci using pattern matching
fn fibonacci(n: u32) -> u64 {
    match n {
        0 => 0,
        1 => 1,
        _ => fibonacci(n - 1) + fibonacci(n - 2),
    }
}

/// Process items with closures
fn process_items<T, F>(items: Vec<T>, mut f: F) -> Vec<T>
where
    T: Clone,
    F: FnMut(&T) -> bool,
{
    items.into_iter().filter(|item| f(item)).collect()
}

/// Async function example
async fn fetch_data(url: &str) -> Result<String, AppError> {
    // Simulated async operation
    tokio::time::sleep(std::time::Duration::from_millis(100)).await;
    Ok(format!("Data from {}", url))
}

fn main() -> Result<(), Box<dyn Error>> {
    let mut repo = UserRepository::new();

    // Create user with builder pattern
    let user = User::new(1, "Alice")
        .with_email("alice@example.com");

    repo.save(user.clone())?;

    // Pattern matching with if let
    if let Some(found) = repo.find(1)? {
        println!("Found user: {} ({:?})", found.name, found.email);
    }

    // Vector operations
    let numbers: Vec<i32> = vec![1, 2, 3, 4, 5];
    let sum: i32 = numbers
        .iter()
        .filter(|&&x| x > 2)
        .map(|&x| x * 2)
        .sum();

    println!("Sum: {}", sum);

    // String formatting
    let message = format!(
        "User {} has {} items",
        user.name,
        numbers.len()
    );
    println!("{}", message);

    // Match expression
    let status = match user.active {
        true => "active",
        false => "inactive",
    };

    // Tuple destructuring
    let (x, y, z) = (1, 2.0, "three");

    // Range
    for i in 0..5 {
        print!("{} ", fibonacci(i));
    }
    println!();

    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_user_creation() {
        let user = User::new(1, "Test");
        assert_eq!(user.name, "Test");
        assert!(user.active);
    }
}
