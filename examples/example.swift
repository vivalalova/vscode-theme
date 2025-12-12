///
/// Swift Example
/// Demonstrates syntax highlighting
///

import Foundation

// MARK: - Constants

let maxRetries: Int = 3
let pi: Double = 3.14159
let hexValue: Int = 0xFF
let isEnabled: Bool = true
let nullValue: String? = nil

// MARK: - Protocols

protocol Repository {
    associatedtype Item

    func find(id: Int) async throws -> Item?
    func save(_ item: Item) async throws
    func delete(id: Int) async throws
}

protocol Identifiable {
    var id: Int { get }
}

// MARK: - Error Types

enum AppError: Error, LocalizedError {
    case notFound(id: Int)
    case invalidInput(field: String, message: String)
    case networkError(underlying: Error)

    var errorDescription: String? {
        switch self {
        case .notFound(let id):
            return "Item not found: \(id)"
        case .invalidInput(let field, let message):
            return "Invalid \(field): \(message)"
        case .networkError(let error):
            return "Network error: \(error.localizedDescription)"
        }
    }
}

// MARK: - Models

struct User: Identifiable, Codable, Equatable {
    let id: Int
    var name: String
    var email: String?
    var isActive: Bool

    init(id: Int, name: String, email: String? = nil) {
        self.id = id
        self.name = name
        self.email = email
        self.isActive = true
    }
}

// MARK: - Repository Implementation

actor UserRepository: Repository {
    typealias Item = User

    private var storage: [Int: User] = [:]

    func find(id: Int) async throws -> User? {
        return storage[id]
    }

    func save(_ item: User) async throws {
        storage[item.id] = item
    }

    func delete(id: Int) async throws {
        storage.removeValue(forKey: id)
    }

    var count: Int {
        storage.count
    }
}

// MARK: - Generic Functions

func retry<T>(
    maxAttempts: Int = 3,
    delay: TimeInterval = 1.0,
    operation: () async throws -> T
) async throws -> T {
    var lastError: Error?

    for attempt in 1...maxAttempts {
        do {
            return try await operation()
        } catch {
            lastError = error
            if attempt < maxAttempts {
                try await Task.sleep(nanoseconds: UInt64(delay * 1_000_000_000))
            }
        }
    }

    throw lastError!
}

// MARK: - Extensions

extension Array where Element: Numeric {
    func sum() -> Element {
        reduce(0, +)
    }

    func average() -> Double where Element == Int {
        guard !isEmpty else { return 0 }
        return Double(sum()) / Double(count)
    }
}

extension String {
    var isValidEmail: Bool {
        let pattern = #"^[\w.-]+@[\w.-]+\.\w+$"#
        return range(of: pattern, options: .regularExpression) != nil
    }

    func truncated(to length: Int, trailing: String = "...") -> String {
        guard count > length else { return self }
        return String(prefix(length)) + trailing
    }
}

// MARK: - Property Wrappers

@propertyWrapper
struct Clamped<Value: Comparable> {
    private var value: Value
    private let range: ClosedRange<Value>

    var wrappedValue: Value {
        get { value }
        set { value = min(max(range.lowerBound, newValue), range.upperBound) }
    }

    init(wrappedValue: Value, _ range: ClosedRange<Value>) {
        self.range = range
        self.value = min(max(range.lowerBound, wrappedValue), range.upperBound)
    }
}

// MARK: - Class with Observation

@Observable
final class ViewModel {
    var users: [User] = []
    var isLoading: Bool = false
    var errorMessage: String?

    private let repository: UserRepository

    init(repository: UserRepository = UserRepository()) {
        self.repository = repository
    }

    func loadUser(id: Int) async {
        isLoading = true
        defer { isLoading = false }

        do {
            if let user = try await repository.find(id: id) {
                users.append(user)
            } else {
                errorMessage = "User not found"
            }
        } catch {
            errorMessage = error.localizedDescription
        }
    }
}

// MARK: - Computed Properties & Closures

struct Statistics {
    let values: [Double]

    var mean: Double {
        guard !values.isEmpty else { return 0 }
        return values.reduce(0, +) / Double(values.count)
    }

    var sorted: [Double] {
        values.sorted()
    }

    func filtered(where predicate: (Double) -> Bool) -> [Double] {
        values.filter(predicate)
    }
}

// MARK: - Main

@main
struct App {
    static func main() async {
        let repo = UserRepository()

        // Create user
        let user = User(id: 1, name: "Alice", email: "alice@example.com")

        do {
            try await repo.save(user)

            if let found = try await repo.find(id: 1) {
                print("Found user: \(found.name)")
            }
        } catch {
            print("Error: \(error)")
        }

        // Array operations
        let numbers = [1, 2, 3, 4, 5]
        let doubled = numbers
            .filter { $0 > 2 }
            .map { $0 * 2 }

        print("Doubled: \(doubled)")

        // String interpolation
        let message = """
        User: \(user.name)
        Email: \(user.email ?? "N/A")
        Active: \(user.isActive)
        """
        print(message)

        // Guard statement
        guard let email = user.email else {
            print("No email")
            return
        }

        print("Valid email: \(email.isValidEmail)")
    }
}
